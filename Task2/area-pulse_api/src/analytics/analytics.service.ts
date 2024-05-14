import Anthropic from '@anthropic-ai/sdk';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import * as dotenv from 'dotenv';
import { AttendanceEntity } from 'src/attendance/attendance.entity';
import { LocationEntity } from 'src/location/location.entity';
import { LocationService } from 'src/location/location.service';
import { SectorEntity } from 'src/sector/sector.entity';
import { getMaxDailyAnalytics, getMinDailyAnalytics } from 'src/shared/helpers';
import { UserEntity } from 'src/user/user.entity';
import { Between, In, Repository } from 'typeorm';
import { InputAnalyticsDto } from './dto/inputDto';
import { DailyAnalytics } from './types/dailyAnalytics.inteface';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDEAI_KEY, // This is the default and can be omitted
});

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly locationService: LocationService,
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,

    @InjectRepository(AttendanceEntity)
    private readonly attendanceRepository: Repository<AttendanceEntity>,

    @InjectRepository(SectorEntity)
    private readonly sectorRepository: Repository<SectorEntity>,
  ) {}
  async getDailyAnalyticsInfo(
    locationId: number,
    user: UserEntity,
  ): Promise<DailyAnalytics[]> {
    try {
      const today = dayjs().locale('uk').startOf('day');
      const startOfWeek = today.startOf('week').toDate();
      const endOfWeek = today.endOf('week').toDate();

      // Step 1: Find all sectors associated with the given location
      const location = await this.locationRepository.findOne({
        where: { id: locationId, user },
        relations: ['sectors'],
      });

      if (!location) {
        throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
      }

      // If no sectors, there are no attendances
      if (location.sectors.length === 0) {
        return null;
      }

      // Step 2: Find attendance records for those sectors
      const sectorIds = location.sectors.map((sector) => sector.id);

      const dailyAnalytics: DailyAnalytics[] = await this.attendanceRepository
        .createQueryBuilder('attendance')
        .select('DATE(attendance.createdDate) AS day, COUNT(*) AS count')
        .where({ sector: In(sectorIds) })
        .andWhere('attendance.createdDate BETWEEN :start AND :end', {
          start: startOfWeek,
          end: endOfWeek,
        })
        .groupBy('day')
        .getRawMany();

      return dailyAnalytics;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getPercentageForEachSector(
    locationId: number,
    user: UserEntity,
  ): Promise<any> {
    try {
      const location = await this.locationRepository.findOne({
        where: { id: locationId, user },
        relations: ['sectors'],
      });

      if (!location) {
        throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
      }

      if (location.sectors.length === 0) {
        return null;
      }

      const sectorIds = location.sectors.map((sector) => sector.id);

      const today = dayjs().startOf('day');
      const startOfWeek = today.startOf('week').toDate();
      const endOfWeek = today.endOf('week').toDate();

      const totalAttendances = await this.attendanceRepository.count({
        where: {
          sector: In(sectorIds),
          createdDate: Between(startOfWeek, endOfWeek),
        },
      });

      const sectorAttendances = await this.attendanceRepository
        .createQueryBuilder('attendance')
        .select('sector.id AS sectorId, COUNT(*) AS count')
        .innerJoin('attendance.sector', 'sector')
        .where({ sector: In(sectorIds) })
        .andWhere('attendance.createdDate BETWEEN :start AND :end', {
          start: startOfWeek,
          end: endOfWeek,
        })
        .groupBy('sectorId')
        .getRawMany();

      const sectorAttendancesWithPercentage = sectorAttendances.map(
        (sectorAttendance) => ({
          ...sectorAttendance,
          percentage: (sectorAttendance.count / totalAttendances) * 100,
        }),
      );

      return sectorAttendancesWithPercentage;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAnalytics(
    inputAnalytics: InputAnalyticsDto,
    user: UserEntity,
  ): Promise<string> {
    const locationWithAttendances =
      await this.locationService.findLocationByIdWithAttendances(
        inputAnalytics.locationId,
        user,
      );

    const dailyAnalytics = await this.getDailyAnalyticsInfo(
      inputAnalytics.locationId,
      user,
    );

    const minAnalytics = getMinDailyAnalytics(dailyAnalytics);
    const maxAnalytics = getMaxDailyAnalytics(dailyAnalytics);
    const percentageForEachSector = await this.getPercentageForEachSector(
      inputAnalytics.locationId,
      user,
    );

    delete locationWithAttendances.id;

    const message = await anthropic.messages.create({
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `
            Hello, Claude! You are tasked with generating analytics in markdown format based on input data in JSON format. The JSON data will include information about location and it's respective attendance records. Your should parse this data and generate insightful analytics in markdown format.
            Instructions:
            - Skip any explanation of yours just GIVE THE ANSWER
            - Parse the in  put JSON to extract data about each location and its attendances.
            - For location, calculate the average, maximum, minimum, and total attendance.
            - Generate markdown output presenting these analytics for location and overall statistics.
            - Give some tips for improving attendance if possible.
            - Ensure that the markdown output is well-formatted and easy to read

            Example of input JSON Format:
            {
              "id": 3,
              "name": "location",
              "description": "aksghjgdsf",
              "area": 500,
              "attendances": [
                  {
                      "id": 12,
                      "name": "new one",
                      "createdDate": "2024-05-08T18:30:17.863Z",
                      "updatedDate": "2024-05-08T18:30:17.863Z"
                  },
                  {
                      "id": 13,
                      "name": "new one",
                      "createdDate": "2024-05-08T18:30:19.430Z",
                      "updatedDate": "2024-05-08T18:30:19.430Z"
                  }
              ]
          }

          Here is the actual data:
          ${JSON.stringify(locationWithAttendances)}
          `,
        },
      ],
      // model: 'claude-3-opus-20240229',
      model: 'claude-3-haiku-20240307',
    });

    return message.content[0].text;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { AttendanceEntity } from 'src/attendance/attendance.entity';
import { SectorEntity } from 'src/sector/sector.entity';
import { UserEntity } from 'src/user/user.entity';
import { Between, DeleteResult, Repository } from 'typeorm';
import { CreateLocationDto } from './dto/createLocation.dto';
import { UpdateLocationDto } from './dto/updateLocation.dto';
import { LocationEntity } from './location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,

    @InjectRepository(AttendanceEntity)
    private readonly attendanceRepository: Repository<AttendanceEntity>,

    @InjectRepository(SectorEntity)
    private readonly sectorRepository: Repository<SectorEntity>,
  ) {}
  async createLocation(
    createLocationDto: CreateLocationDto,
    currentUser: UserEntity,
  ): Promise<LocationEntity> {
    const newLocation = new LocationEntity();
    Object.assign(newLocation, createLocationDto);

    newLocation.user = currentUser;

    return await this.locationRepository.save(newLocation);
  }

  async findAllLocations(user: UserEntity): Promise<LocationEntity[]> {
    try {
      const locations = await this.locationRepository.find({ where: { user } });
      if (!locations) {
        throw new HttpException('There is no locations', HttpStatus.NOT_FOUND);
      }

      return await this.locationRepository.find({ where: { user } });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findLocationById(
    id: number,
    user: UserEntity,
  ): Promise<LocationEntity> {
    try {
      const location = await this.locationRepository.findOne({
        where: { id, user },
      });
      if (!location) {
        throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
      }

      return location;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findLocationByIdWithAttendances(
    id: number,
    user: UserEntity,
  ): Promise<LocationEntity> {
    try {
      const today = dayjs().startOf('day');
      const startOfWeek = today.startOf('week').toDate();
      const endOfWeek = today.endOf('week').toDate();

      const location = await this.locationRepository.findOne({
        where: {
          id,
          user,
          sectors: {
            attendances: {
              createdDate: Between(startOfWeek, endOfWeek),
            },
          },
        },
        relations: ['sectors', 'sectors.attendances'],
      });

      if (!location) {
        throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
      }

      return location;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findLocationByIdWithAllAttendances(
    id: number,
    user: UserEntity,
  ): Promise<LocationEntity> {
    try {
      const location = await this.locationRepository.findOne({
        where: {
          id,
          user,
        },
        relations: ['sectors', 'sectors.attendances'],
      });

      if (!location) {
        throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
      }

      return location;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateLocation(
    id: number,
    user: UserEntity,
    updateLocationDto: UpdateLocationDto,
  ): Promise<LocationEntity> {
    const location = await this.findLocationById(id, user);
    Object.assign(location, updateLocationDto);

    return await this.locationRepository.save(location);
  }

  async removeLocation(id: number): Promise<DeleteResult> {
    return await this.locationRepository.delete({ id });
  }
}

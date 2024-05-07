import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { LocationService } from './../location/location.service';
import { AttendanceEntity } from './attendance.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceEntity)
    private readonly attendanceRepository: Repository<AttendanceEntity>,
    private readonly locationService: LocationService,
  ) {}
  async createAttendance(
    createAttendanceDto: CreateAttendanceDto,
    currentUser: UserEntity,
  ): Promise<AttendanceEntity> {
    const newAttendance = new AttendanceEntity();
    newAttendance.name = createAttendanceDto.name;

    const location = await this.locationService.findLocationById(
      createAttendanceDto.locationId,
      currentUser,
    );
    if (!location) {
      // Handle error when location is not found
      throw new Error('Location not found');
    }

    newAttendance.location = location;

    return await this.attendanceRepository.save(newAttendance);
  }

  async findAllAttendances(): Promise<AttendanceEntity[]> {
    return await this.attendanceRepository.find();
  }

  async findOneAttendance(id: number): Promise<AttendanceEntity> {
    return await this.attendanceRepository.findOneBy({ id });
  }

  async updateAttendance(
    id: number,
    updateAttendanceDto: UpdateAttendanceDto,
  ): Promise<AttendanceEntity> {
    const attendance = await this.findOneAttendance(id);
    Object.assign(attendance, updateAttendanceDto);

    return await this.attendanceRepository.save(attendance);
  }

  async removeAttendance(id: number): Promise<DeleteResult> {
    return await this.attendanceRepository.delete({ id });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { AttendanceEntity } from './attendance.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceEntity)
    private readonly attendanceRepository: Repository<AttendanceEntity>,
  ) {}
  async createAttendance(
    createAttendanceDto: CreateAttendanceDto,
  ): Promise<AttendanceEntity> {
    const newAttendance = new AttendanceEntity();
    Object.assign(newAttendance, createAttendanceDto);

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

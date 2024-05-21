import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectorService } from 'src/sector/sector.service';
import { Repository } from 'typeorm';
import { AttendanceEntity } from './attendance.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceEntity)
    private readonly attendanceRepository: Repository<AttendanceEntity>,
    private readonly sectorService: SectorService,
  ) {}
  async createAttendance(
    createAttendanceDto: CreateAttendanceDto,
  ): Promise<AttendanceEntity> {
    const newAttendance = new AttendanceEntity();
    newAttendance.name = createAttendanceDto.name;

    const sector = await this.sectorService.findSectorById(
      createAttendanceDto.sectorId,
    );

    if (!sector) {
      throw new Error('Sector not found');
    }

    newAttendance.sector = sector;

    return await this.attendanceRepository.save(newAttendance);
  }

  async findAllAttendances(): Promise<AttendanceEntity[]> {
    return await this.attendanceRepository.find();
  }

  async findOneAttendance(id: number): Promise<AttendanceEntity> {
    return await this.attendanceRepository.findOneBy({ id });
  }
}

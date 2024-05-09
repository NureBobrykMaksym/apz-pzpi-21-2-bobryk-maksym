import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '../user/guards/auth.guard';
import { AttendanceEntity } from './attendance.entity';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Controller('attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Body('attendance') createAttendanceDto: CreateAttendanceDto,
  ): Promise<AttendanceEntity> {
    return this.attendanceService.createAttendance(createAttendanceDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(): Promise<AttendanceEntity[]> {
    return this.attendanceService.findAllAttendances();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string): Promise<AttendanceEntity> {
    return this.attendanceService.findOneAttendance(+id);
  }
}

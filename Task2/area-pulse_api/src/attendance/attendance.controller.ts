import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '../user/decorator/user.decorator';
import { AuthGuard } from '../user/guards/auth.guard';
import { UserEntity } from '../user/user.entity';
import { DeleteResult } from 'typeorm';
import { AttendanceEntity } from './attendance.entity';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Body('attendance') createAttendanceDto: CreateAttendanceDto,
    @User() currentUser: UserEntity,
  ): Promise<AttendanceEntity> {
    return this.attendanceService.createAttendance(
      createAttendanceDto,
      currentUser,
    );
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

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ): Promise<AttendanceEntity> {
    return this.attendanceService.updateAttendance(+id, updateAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.attendanceService.removeAttendance(+id);
  }
}

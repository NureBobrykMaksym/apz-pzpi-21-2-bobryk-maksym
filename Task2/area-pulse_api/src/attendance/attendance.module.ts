import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceController } from './attendance.controller';
import { AttendanceEntity } from './attendance.entity';
import { AttendanceService } from './attendance.service';
import { AuthGuard } from 'src/user/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceEntity])],
  controllers: [AttendanceController],
  providers: [AttendanceService, AuthGuard],
  exports: [AttendanceService],
})
export class AttendanceModule {}

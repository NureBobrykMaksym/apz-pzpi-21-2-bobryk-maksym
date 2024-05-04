import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceController } from './attendance.controller';
import { AttendanceEntity } from './attendance.entity';
import { AttendanceService } from './attendance.service';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { LocationService } from 'src/location/location.service';
import { LocationEntity } from 'src/location/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceEntity, LocationEntity])],
  controllers: [AttendanceController],
  providers: [AttendanceService, AuthGuard, LocationService],
  exports: [AttendanceService],
})
export class AttendanceModule {}

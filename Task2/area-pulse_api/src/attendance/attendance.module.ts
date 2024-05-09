import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationEntity } from 'src/location/location.entity';
import { LocationService } from 'src/location/location.service';
import { SectorEntity } from 'src/sector/sector.entity';
import { SectorService } from 'src/sector/sector.service';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { AttendanceController } from './attendance.controller';
import { AttendanceEntity } from './attendance.entity';
import { AttendanceService } from './attendance.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AttendanceEntity, SectorEntity, LocationEntity]),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService, AuthGuard, SectorService, LocationService],
  exports: [AttendanceService],
})
export class AttendanceModule {}

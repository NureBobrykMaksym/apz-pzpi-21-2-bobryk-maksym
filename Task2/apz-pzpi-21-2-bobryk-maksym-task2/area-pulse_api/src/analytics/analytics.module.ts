import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceEntity } from 'src/attendance/attendance.entity';
import { LocationEntity } from 'src/location/location.entity';
import { LocationService } from 'src/location/location.service';
import { SectorEntity } from 'src/sector/sector.entity';
import { AuthGuard } from '../user/guards/auth.guard';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocationEntity, AttendanceEntity, SectorEntity]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AuthGuard, LocationService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}

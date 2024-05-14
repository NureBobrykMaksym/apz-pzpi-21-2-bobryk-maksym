import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceEntity } from 'src/attendance/attendance.entity';
import { SectorEntity } from 'src/sector/sector.entity';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { LocationController } from './location.controller';
import { LocationEntity } from './location.entity';
import { LocationService } from './location.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocationEntity, SectorEntity, AttendanceEntity]),
  ],
  controllers: [LocationController],
  providers: [LocationService, AuthGuard],
  exports: [LocationService],
})
export class LocationModule {}

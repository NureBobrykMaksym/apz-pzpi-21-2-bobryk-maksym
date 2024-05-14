import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceEntity } from 'src/attendance/attendance.entity';
import { LocationEntity } from 'src/location/location.entity';
import { LocationService } from 'src/location/location.service';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { SectorController } from './sector.controller';
import { SectorEntity } from './sector.entity';
import { SectorService } from './sector.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SectorEntity, LocationEntity, AttendanceEntity]),
  ],
  controllers: [SectorController],
  providers: [SectorService, AuthGuard, LocationEntity, LocationService],
  exports: [SectorService],
})
export class SectorModule {}

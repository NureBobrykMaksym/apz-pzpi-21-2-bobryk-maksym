import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceEntity } from 'src/attendance/attendance.entity';
import { LocationEntity } from 'src/location/location.entity';
import { LocationService } from 'src/location/location.service';
import { SectorEntity } from 'src/sector/sector.entity';
import { SectorService } from 'src/sector/sector.service';
import { SensorController } from './sensor.controller';
import { SensorEntity } from './sensor.entity';
import { SensorService } from './sensor.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SensorEntity,
      SectorEntity,
      LocationEntity,
      AttendanceEntity,
    ]),
  ],
  controllers: [SensorController],
  providers: [SensorService, SectorService, LocationService],
  exports: [SensorService],
})
export class SensorModule {}

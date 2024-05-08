import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationEntity } from 'src/location/location.entity';
import { LocationService } from 'src/location/location.service';
import { AuthGuard } from '../user/guards/auth.guard';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AuthGuard, LocationService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}

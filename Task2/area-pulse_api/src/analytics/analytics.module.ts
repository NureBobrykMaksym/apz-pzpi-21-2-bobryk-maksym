import { Module } from '@nestjs/common';
import { AuthGuard } from '../user/guards/auth.guard';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

@Module({
  imports: [],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AuthGuard],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}

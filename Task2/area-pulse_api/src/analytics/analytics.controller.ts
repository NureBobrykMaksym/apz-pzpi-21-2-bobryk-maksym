import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async getAnalytics(): Promise<string> {
    return this.analyticsService.getAnalytics();
  }
}

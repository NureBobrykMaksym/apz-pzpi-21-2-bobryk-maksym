import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '../user/decorator/user.decorator';
import { AuthGuard } from '../user/guards/auth.guard';
import { UserEntity } from '../user/user.entity';
import { AnalyticsService } from './analytics.service';
import { InputAnalyticsDto } from './dto/inputDto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async getAnalytics(
    @Body('input') inputDto: InputAnalyticsDto,
    @User() user: UserEntity,
  ): Promise<string> {
    return this.analyticsService.getAnalytics(inputDto, user);
  }
}

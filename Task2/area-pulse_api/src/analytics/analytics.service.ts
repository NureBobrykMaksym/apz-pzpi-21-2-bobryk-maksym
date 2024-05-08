import Anthropic from '@anthropic-ai/sdk';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { LocationService } from 'src/location/location.service';
import { UserEntity } from 'src/user/user.entity';
import { InputAnalyticsDto } from './dto/inputDto';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDEAI_KEY, // This is the default and can be omitted
});

@Injectable()
export class AnalyticsService {
  constructor(private readonly locationService: LocationService) {}
  async getAnalytics(
    inputAnalytics: InputAnalyticsDto,
    user: UserEntity,
  ): Promise<string> {
    const locationWithAttendances =
      await this.locationService.findLocationByIdWithAttendances(
        inputAnalytics.locationId,
        user,
      );

    console.log(locationWithAttendances);

    const message = await anthropic.messages.create({
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content:
            inputAnalytics.additionalInput ||
            'Hello, Claude! Can you name the France capital, please? Give answer in markdown format.',
        },
      ],
      // model: 'claude-3-opus-20240229',
      model: 'claude-3-haiku-20240307',
    });

    return message.content[0].text;
  }
}

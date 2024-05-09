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

    delete locationWithAttendances.id;

    const message = await anthropic.messages.create({
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `
            Hello, Claude! You are tasked with generating analytics in markdown format based on input data in JSON format. The JSON data will include information about location and it's respective attendance records. Your should parse this data and generate insightful analytics in markdown format.
            Instructions:
            - Skip any explanation of yours just GIVE THE ANSWER
            - Parse the in  put JSON to extract data about each location and its attendances.
            - For location, calculate the average, maximum, minimum, and total attendance.
            - Generate markdown output presenting these analytics for location and overall statistics.
            - Give some tips for improving attendance if possible.
            - Ensure that the markdown output is well-formatted and easy to read

            Example of input JSON Format:
            {
              "id": 3,
              "name": "location",
              "description": "aksghjgdsf",
              "area": 500,
              "attendances": [
                  {
                      "id": 12,
                      "name": "new one",
                      "createdDate": "2024-05-08T18:30:17.863Z",
                      "updatedDate": "2024-05-08T18:30:17.863Z"
                  },
                  {
                      "id": 13,
                      "name": "new one",
                      "createdDate": "2024-05-08T18:30:19.430Z",
                      "updatedDate": "2024-05-08T18:30:19.430Z"
                  }
              ]
          }

          Here is the actual data:
          ${JSON.stringify(locationWithAttendances)}
          `,
        },
      ],
      // model: 'claude-3-opus-20240229',
      model: 'claude-3-haiku-20240307',
    });

    return message.content[0].text;
  }
}

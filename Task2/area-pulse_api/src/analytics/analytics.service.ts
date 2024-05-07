import Anthropic from '@anthropic-ai/sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  async getAnalytics(): Promise<string> {
    const anthropic = new Anthropic({
      apiKey: process.env.CLAUDEAI_KEY, // This is the default and can be omitted
    });
    const message = await anthropic.messages.create({
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: 'Hello, Claude! Can you name the France capital, please?',
        },
      ],
      // model: 'claude-3-opus-20240229',
      model: 'claude-3-haiku-20240307',
    });

    return message.content[0].text;
  }
}

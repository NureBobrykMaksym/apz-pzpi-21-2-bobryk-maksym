import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class InputAnalyticsDto {
  @IsNotEmpty()
  @IsNumber()
  readonly locationId: number;

  @IsOptional()
  @IsString()
  readonly additionalInput: string;
}

import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSensorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  sectorId: number;
}

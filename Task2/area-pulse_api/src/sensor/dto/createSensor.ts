import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSensorDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  sectorId: number;
}

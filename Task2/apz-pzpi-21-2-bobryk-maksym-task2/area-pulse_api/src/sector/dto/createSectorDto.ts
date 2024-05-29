import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSectorDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly locationId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly attendanceCoefficient: number;
}

import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSectorDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsNumber()
  readonly attendanceCoefficient: number;
}

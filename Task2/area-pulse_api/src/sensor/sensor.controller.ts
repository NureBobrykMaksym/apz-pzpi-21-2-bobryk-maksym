import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { DeleteResult } from 'typeorm';
import { CreateSensorDto } from './dto/createSensor';
import { UpdateSensorDto } from './dto/updateSensor';
import { SensorEntity } from './sensor.entity';
import { SensorService } from './sensor.service';

@Controller('sensors')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createSensor(
    @Body('sensor') createSensorDto: CreateSensorDto,
  ): Promise<SensorEntity> {
    return this.sensorService.createSensor(createSensorDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAllSensors(
    @Query('sectorId') sectorId: string,
  ): Promise<SensorEntity[]> {
    return this.sensorService.findAllSensors(+sectorId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOneSensor(@Param('id') id: string): Promise<SensorEntity> {
    return this.sensorService.findSensorById(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateSensor(
    @Param('id') id: string,
    @Body('sensor') updateSensorDto: UpdateSensorDto,
  ): Promise<SensorEntity> {
    return this.sensorService.updateSector(+id, updateSensorDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async removeSensor(@Param('id') id: string): Promise<DeleteResult> {
    return this.sensorService.deleteSensor(+id);
  }
}

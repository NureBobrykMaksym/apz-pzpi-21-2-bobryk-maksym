import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectorService } from 'src/sector/sector.service';
import { DeleteResult, Repository } from 'typeorm';
import { CreateSensorDto } from './dto/createSensor';
import { UpdateSensorDto } from './dto/updateSensor';
import { SensorEntity } from './sensor.entity';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(SensorEntity)
    private readonly sensorRepository: Repository<SensorEntity>,
    private readonly sectorService: SectorService,
  ) {}

  async createSensor(createSensorDto: CreateSensorDto): Promise<SensorEntity> {
    try {
      const newSensor = new SensorEntity();

      const sector = await this.sectorService.findSectorById(
        createSensorDto.sectorId,
      );

      if (!sector) {
        throw new HttpException('Sector is not found', HttpStatus.NOT_FOUND);
      }

      Object.assign(newSensor, { name: createSensorDto.name, sector });

      return await this.sensorRepository.save(newSensor);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllSensors(sectorId: number): Promise<SensorEntity[]> {
    try {
      const sector = await this.sectorService.findSectorById(sectorId);
      if (!sector) {
        throw new HttpException('Sector is not found', HttpStatus.NOT_FOUND);
      }

      delete sector.attendances;

      const sensors = await this.sensorRepository.find({
        // where: { sector: { id: sectorId } },
        where: { sector },
      });
      if (!sensors) {
        throw new HttpException('There is no sensors', HttpStatus.NOT_FOUND);
      }

      return await sensors;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findSensorById(id: number): Promise<SensorEntity> {
    try {
      const sensor = await this.sensorRepository.findOne({
        where: { id },
        relations: ['sector'],
      });

      if (!sensor) {
        throw new Error('Sensor not found');
      }

      return sensor;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateSector(
    id: number,
    updateSensorDto: UpdateSensorDto,
  ): Promise<SensorEntity> {
    try {
      let sector;
      const assignedObject = { name: updateSensorDto.name };

      if (updateSensorDto.sectorId) {
        sector = await this.sectorService.findSectorById(
          updateSensorDto.sectorId,
        );

        if (!sector) {
          throw new HttpException('Sector not found', HttpStatus.NOT_FOUND);
        }

        Object.assign(assignedObject, { sector });
      }

      const sensor = await this.sensorRepository.findOne({
        where: { id },
      });

      if (!sensor) {
        throw new Error('Sensor not found');
      }
      Object.assign(sensor, assignedObject);

      return await this.sensorRepository.save(sensor);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteSensor(id: number): Promise<DeleteResult> {
    try {
      const sensor = await this.sensorRepository.findOne({
        where: { id },
      });
      if (!sensor) {
        throw new Error('Sensor not found');
      }

      return await this.sensorRepository.delete({ id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

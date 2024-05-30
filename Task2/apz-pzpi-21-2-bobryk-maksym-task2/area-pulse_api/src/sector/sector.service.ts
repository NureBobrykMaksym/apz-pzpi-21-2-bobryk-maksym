import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationService } from 'src/location/location.service';
import { UserEntity } from 'src/user/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateSectorDto } from './dto/createSectorDto';
import { UpdateSectorDto } from './dto/updateSectorDto';
import { SectorEntity } from './sector.entity';

@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(SectorEntity)
    private readonly sectorRepository: Repository<SectorEntity>,
    private readonly locationService: LocationService,
  ) {}

  async createSector(
    createSectorDto: CreateSectorDto,
    user: UserEntity,
  ): Promise<SectorEntity> {
    try {
      const newSector = new SectorEntity();
      Object.assign(newSector, createSectorDto);

      const location = await this.locationService.findLocationById(
        createSectorDto.locationId,
        user,
      );

      if (!location) {
        throw new Error('Location not found');
      }

      newSector.location = location;

      return await this.sectorRepository.save(newSector);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllSectors(
    locationId: number,
    user: UserEntity,
  ): Promise<SectorEntity[]> {
    try {
      const location = await this.locationService.findLocationById(
        locationId,
        user,
      );

      if (!location) {
        throw new Error('Location not found');
      }

      const sectors = await this.sectorRepository.find({ where: { location } });
      if (!sectors) {
        throw new Error('There is no sectors');
      }

      return await sectors;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findSectorById(id: number): Promise<SectorEntity> {
    try {
      const sector = await this.sectorRepository.findOne({
        where: { id },
        relations: ['attendances'],
      });

      if (!sector) {
        throw new Error('Sector not found');
      }

      return sector;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateSector(
    id: number,
    updateSectorDto: UpdateSectorDto,
  ): Promise<SectorEntity> {
    try {
      const sector = await this.sectorRepository.findOne({
        where: { id },
      });
      if (!sector) {
        throw new Error('Sector not found');
      }

      Object.assign(sector, updateSectorDto);

      return await this.sectorRepository.save(sector);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteSector(id: number): Promise<DeleteResult> {
    try {
      const sector = await this.sectorRepository.findOne({
        where: { id },
      });
      if (!sector) {
        throw new Error('Sector not found');
      }

      return await this.sectorRepository.delete({ id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

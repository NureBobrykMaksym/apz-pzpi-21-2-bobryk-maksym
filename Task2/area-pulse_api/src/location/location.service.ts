import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateLocationDto } from './dto/createLocation.dto';
import { UpdateLocationDto } from './dto/updateLocation.dto';
import { LocationEntity } from './location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {}
  async createLocation(
    createLocationDto: CreateLocationDto,
  ): Promise<LocationEntity> {
    const newLocation = new LocationEntity();
    Object.assign(newLocation, createLocationDto);

    return await this.locationRepository.save(newLocation);
  }

  async findAllLocations(): Promise<LocationEntity[]> {
    return await this.locationRepository.find();
  }

  async findLocationById(id: number): Promise<LocationEntity> {
    return await this.locationRepository.findOneBy({ id });
  }

  async updateLocation(
    id: number,
    updateLocationDto: UpdateLocationDto,
  ): Promise<LocationEntity> {
    const location = await this.findLocationById(id);
    Object.assign(location, updateLocationDto);

    return await this.locationRepository.save(location);
  }

  async removeLocation(id: number): Promise<DeleteResult> {
    return await this.locationRepository.delete({ id });
  }
}

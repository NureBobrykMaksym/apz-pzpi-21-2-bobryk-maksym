import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/user/decorator/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { UserEntity } from 'src/user/user.entity';
import { DeleteResult } from 'typeorm';
import { CreateLocationDto } from './dto/createLocation.dto';
import { UpdateLocationDto } from './dto/updateLocation.dto';
import { LocationEntity } from './location.entity';
import { LocationService } from './location.service';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @Body('location') createLocationDto: CreateLocationDto,
    @User() currentUser: UserEntity,
  ): Promise<LocationEntity> {
    return this.locationService.createLocation(createLocationDto, currentUser);
  }

  @Get()
  findAll(@User() user: UserEntity): Promise<LocationEntity[]> {
    return this.locationService.findAllLocations(user);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @User() user: UserEntity,
  ): Promise<LocationEntity> {
    return this.locationService.findLocationById(+id, user);
  }

  @Get(':id/attendances')
  @UseGuards(AuthGuard)
  async findOneWithAttendances(
    @Param('id') id: string,
    @User() user: UserEntity,
  ): Promise<LocationEntity> {
    return this.locationService.findLocationByIdWithAttendances(+id, user);
  }

  @Get(':id/attendances-all')
  @UseGuards(AuthGuard)
  async findOneWithAllAttendances(
    @Param('id') id: string,
    @User() user: UserEntity,
  ): Promise<LocationEntity> {
    return this.locationService.findLocationByIdWithAllAttendances(+id, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body('location') updateLocationDto: UpdateLocationDto,
    @User() user: UserEntity,
  ): Promise<LocationEntity> {
    return this.locationService.updateLocation(+id, user, updateLocationDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.locationService.removeLocation(+id);
  }
}

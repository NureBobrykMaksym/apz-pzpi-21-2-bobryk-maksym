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
import { CreateLocationDto } from './dto/createLocation.dto';
import { UpdateLocationDto } from './dto/updateLocation.dto';
import { LocationService } from './location.service';
import { LocationEntity } from './location.entity';

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
  findAll() {
    return this.locationService.findAllLocations();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findLocationById(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body('location') updateLocationDto: UpdateLocationDto,
    @User() user: UserEntity,
  ) {
    return this.locationService.updateLocation(+id, updateLocationDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @User() user: UserEntity) {
    return this.locationService.removeLocation(+id);
  }
}

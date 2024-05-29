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
import { User } from 'src/user/decorator/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { UserEntity } from 'src/user/user.entity';
import { DeleteResult } from 'typeorm';
import { CreateSectorDto } from './dto/createSectorDto';
import { UpdateSectorDto } from './dto/updateSectorDto';
import { SectorEntity } from './sector.entity';
import { SectorService } from './sector.service';

@Controller('sectors')
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createSector(
    @User() currentUser: UserEntity,
    @Body('sector') createSectorDto: CreateSectorDto,
  ): Promise<SectorEntity> {
    return this.sectorService.createSector(createSectorDto, currentUser);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAllSectors(
    @User() currentUser: UserEntity,
    @Query('locationId') locationId: string,
  ): Promise<SectorEntity[]> {
    return this.sectorService.findAllSectors(+locationId, currentUser);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOneSector(@Param('id') id: string): Promise<SectorEntity> {
    return this.sectorService.findSectorById(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateSector(
    @User() currentUser: UserEntity,
    @Param('id') id: string,
    @Body('sector') updateSectorDto: UpdateSectorDto,
  ): Promise<SectorEntity> {
    return this.sectorService.updateSector(+id, updateSectorDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async removeSector(@Param('id') id: string): Promise<DeleteResult> {
    return this.sectorService.deleteSector(+id);
  }
}

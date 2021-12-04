import { Get, Controller, UsePipes, Post, Body, Param } from '@nestjs/common';

import { LocationEntity } from './location.entity';
import { LocationService } from './location.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { LocationRO } from './location.interface';
 
@ApiBearerAuth()
@ApiTags('location')
@Controller('location')
export class LocationController {

  constructor(private readonly locationService: LocationService) {}

  @Get()
  async findAll(): Promise<LocationEntity[]> {
    return await this.locationService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Param('lat') lat: string, @Param('lng') lng: string,@Param('carId') carId: string): Promise<LocationRO> {
    console.log(123);
    return this.locationService.create({lat,lng,carId});
  }



}
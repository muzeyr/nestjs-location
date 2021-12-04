import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { LocationEntity } from './location.entity';
import { LocationRO } from './location.interface';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { validate } from 'class-validator';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '../config';
import { LocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>
  ) {}

  async findAll(): Promise<LocationEntity[]> {
    return await this.locationRepository.find();
  }
  async create(dto: LocationDto): Promise<LocationRO> {

    // check uniqueness of username/email
    const {lat, lng,carId} = dto;
    const qb = await getRepository(LocationEntity)
      .createQueryBuilder('location')
      .where('location.lat = :lat', { lat })
      .orWhere('location.lng = :lng', { lng });

    const location = await qb.getOne();

    if (location) {
      const errors = {car: 'location and car  must be unique.'};
      throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);

    }

    // create new user
    let newLocation = new LocationEntity();
    newLocation.lng = lng;
    newLocation.lat = lat;

    const errors = await validate(newLocation);
    if (errors.length > 0) {
      const _errors = {username: 'Location is not valid.'};
      throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);

    } else {
      const savedLocation = await this.locationRepository.save(newLocation);
      return this.buildUserRO(savedLocation);
    }

  }


  private buildUserRO(location: LocationEntity) {
    const locationRO = {
      id: location.id,
      lat: location.lat,
      lng: location.lng,
      token: this.generateJWT(location),
      
    };

    return {location: locationRO};
  }


  public generateJWT(user) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      exp: exp.getTime() / 1000,
    }, SECRET);
  };



}

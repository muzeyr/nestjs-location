import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
 import { LocationService } from './location.service';
import { LocationEntity } from './location.entity';
import { LocationController } from './location.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity])],
  providers: [LocationService],
  controllers: [
    LocationController
  ],
  exports: []
})
export class LocationModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
  }
}

import { IsNotEmpty } from 'class-validator';

export class LocationDto {

  @IsNotEmpty()
  readonly lat: string;

  @IsNotEmpty()
  readonly lng: string;

  @IsNotEmpty()
  readonly carId: string;
}
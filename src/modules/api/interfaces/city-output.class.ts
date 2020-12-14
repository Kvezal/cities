import { ApiProperty } from '@nestjs/swagger';

import { LocationOutput } from './location-output.class';


export class CityOutput {
  @ApiProperty({
    description: `city id`,
    example: `023dda52-f07b-47ef-a44c-2301f8743149`,
  })
  id: string;

  @ApiProperty({
    description: `city name`,
    example: `Amsterdam`,
  })
  title: string

  @ApiProperty({description: `city location params of the map`})
  location: LocationOutput
}
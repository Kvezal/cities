import { ApiProperty } from '@nestjs/swagger';

import { CityOutput } from './city-output.class';
import { LocationOutput } from './location-output.class';
import { IUserOutput } from './user-output.class';


export class HotelOutput {
  @ApiProperty({
    description: `hotel id`,
    example: `023dda52-f07b-47ef-a44c-2301f8743149`
  })
  id: string;

  @ApiProperty({
    description: `hotel name`,
    example: `Wood and stone place`,
  })
  title: string;

  @ApiProperty({
    description: `hotel description`,
    example: `A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends`,
  })
  description: string;

  @ApiProperty({
    description: `bedroom count of a hotel`,
    example: 3,
  })
  bedroomCount: number;

  @ApiProperty({
    description: `maximum number of adults`,
    example: 4,
  })
  maxAdultCount: number;

  @ApiProperty({
    description: `price per the night at the hotel`,
    example: 250,
  })
  price: number;

  @ApiProperty({
    description: `is premium hotel`,
    example: true,
  })
  isPremium: boolean;

  @ApiProperty({
    description: `average hotel rating`,
    example: 4.2,
  })
  rating: number;

  @ApiProperty({
    description: `features of the hotel`,
    example: [`Breakfast`, `Washer`, `Fridge`, `Coffee machine`],
  })
  features: string[];

  @ApiProperty({
    description: `hotel type`,
    example: `apartment`,
  })
  type: string;

  @ApiProperty({description: `city where the hotel is located`})
  city: CityOutput;

  @ApiProperty({description: `coords of the hotel on the map`})
  location: LocationOutput;

  @ApiProperty({description: `hotel owner`})
  host: IUserOutput;

  @ApiProperty({
    description: `features of the hotel`,
    example: [`images/hotels/4.jpg`, `images/hotels/5.jpg`,`images/hotels/6.jpg`],
  })
  images: string[];

  @ApiProperty({
    description: `favorite flag for authorized user`,
    example: true,
  })
  isFavorite: boolean;
}
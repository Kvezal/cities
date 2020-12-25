import { ApiProperty } from '@nestjs/swagger';


export class FavoriteOutput {
  @ApiProperty({
    description: `hotel id`,
    example: `023dda52-f07b-47ef-a44c-2301f8743149`,
  })
  hotelId: string;


  @ApiProperty({
    description: `hotel id`,
    example: `023dda52-f07b-47ef-a44c-2301f8743149`,
  })
  userId: string;


  @ApiProperty({
    description: `favorite status`,
    example: true,
  })
  value: boolean;
}
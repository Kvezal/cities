import { ApiProperty } from '@nestjs/swagger';

import { IJsonWebTokenParams } from 'domains/entities';


export class JsonWebTokenParams implements IJsonWebTokenParams {
  @ApiProperty({
    description: `user id`,
    example: `023dda52-f07b-47ef-a44c-2301f8743149`,
  })
  id: string;

  @ApiProperty({
    description: `user name`,
    example: `kvezal`
  })
  name: string;

  @ApiProperty({
    description: `user email`,
    example: `kvezal@gmail.com`,
  })
  email: string;

  @ApiProperty({
    description: `user avatar`,
    example: `path/to/image.jpg`
  })
  image: string;
}
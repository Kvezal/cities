import { ApiProperty } from '@nestjs/swagger';

import { IJsonWebTokenParams } from 'domains/entities';


export class IUserOut {
  @ApiProperty({description: `user id`})
  id: string;

  @ApiProperty({description: `user name`})
  name: string;

  @ApiProperty({description: `user type`, enum: [`standard`, `pro`]})
  type: string;

  @ApiProperty({description: `user avatar`})
  image: string;
}


export class JsonWebTokenParams implements IJsonWebTokenParams {
  @ApiProperty({description: `user id`})
  id: string;

  @ApiProperty({description: `user name`})
  name: string;

  @ApiProperty({description: `user email`})
  email: string;

  @ApiProperty({description: `user avatar`})
  image: string;
}
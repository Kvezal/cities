import { IUserOutput } from './user-output.class';
import { ApiProperty } from '@nestjs/swagger';


export class CommentOutput {
  @ApiProperty({
    description: `comment id`,
    example: `023dda52-f07b-47ef-a44c-2301f8743149`,
  })
  id: string;

  @ApiProperty({
    description: `comment text`,
    example: `This is one of user comment example to describe a impression`,
  })
  text: string;

  @ApiProperty({
    description: `comment creation date`,
    example: `2020-12-14 14:19:16.628657`,
  })
  createdAt: Date;

  @ApiProperty({
    description: `hotel rating`,
    example: 5,
  })
  rating: number;

  @ApiProperty({description: `params of created comment by user`})
  user: IUserOutput;
}
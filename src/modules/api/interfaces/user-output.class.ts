import { ApiProperty } from '@nestjs/swagger';


export class IUserOutput {
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
    description: `user type`,
    example: `standard`,
    enum: [`standard`, `pro`]
  })
  type: string;

  @ApiProperty({
    description: `user avatar`,
    example: `path/to/image.jpg`
  })
  image: string;
}
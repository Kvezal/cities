import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';


export const login = {
  password: {
    MIN_LENGTH: 6,
  }
};

export class AuthLoginDto {
  @ApiProperty({
    description: `user email`,
    example: `kvezal@gmail.com`,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: `user password`,
    example: `Jy9asOu`,
  })
  @IsString()
  @MinLength(login.password.MIN_LENGTH)
  password: string;
}
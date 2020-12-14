import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import {
  IImage,
  IJsonWebTokenParams,
} from 'domains/entities';


export const login = {
  password: {
    MIN_LENGTH: 6,
  }
};

export class AuthLoginDto {
  @ApiProperty({
    description: `registered user or new user email address`,
    example: `test@gmail.com`,
    required: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: `user password`,
    example: `Jy9asOu`,
    required: true,
  })
  @IsString()
  @MinLength(login.password.MIN_LENGTH)
  password: string;
}
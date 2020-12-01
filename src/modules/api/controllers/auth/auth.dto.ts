import { IsEmail, IsString, MinLength } from 'class-validator';


export const login = {
  password: {
    MIN_LENGTH: 6,
  }
};

export class AuthLoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(login.password.MIN_LENGTH)
  password: string;
}

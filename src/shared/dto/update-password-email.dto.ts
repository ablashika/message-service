import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordEmailDto {

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

    @IsString()
    resetLink: string
  }
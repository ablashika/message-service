import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailRequestDto {
  @IsEmail()
  @IsNotEmpty()
  to?: string;


  @IsString()
  @IsNotEmpty()
  subject?: string;

  @IsString()
  @IsNotEmpty()
  text?: string;
  

}
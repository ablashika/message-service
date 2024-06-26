import { IsEmail, IsNotEmpty, IsString } from 'class-validator';



export class SendEmailDto {

  @IsEmail()
  to: string;


  @IsString()
  subject: string;


  @IsString()
  text: string;
  }
import { IsEmail, IsNotEmpty } from 'class-validator';


export class CashOutDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

  }
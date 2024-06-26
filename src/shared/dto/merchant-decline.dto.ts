import { IsEmail } from 'class-validator';


export class MerchantDeclineDto {


    @IsEmail()
    email: string;


  }
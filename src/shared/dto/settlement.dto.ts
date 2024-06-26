import { IsEmail} from 'class-validator';

export class SettlementsDto {

    @IsEmail()
    email: string;


    
  }
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class MerchantApprovalDto {


    @IsEmail()
    email: string;

}
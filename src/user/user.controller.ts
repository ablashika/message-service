import { Controller, Post, Body,Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { EmailService } from '../email-service/email-service.service';
import { AppService } from './../app.service';
import {SmsRequestDto, SmsResponseDto} from '../../src/sms-service/dto/sms.dto'
import { HttpService } from '@nestjs/axios';
import { from } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly appService: AppService,
    private readonly logger: Logger,
    private readonly httpService: HttpService,
  ) {}

  @Post('create')
  async createUser(@Body('email') email: string, @Body('userType') userType: string) {
    await this.userService.createUser(email, userType);

    // Determine the welcome message based on usertype
    let emailSubject = 'Account Created Successfully';
    let emailText = 'Your account has been created successfully.';

    if (userType === 'merchant') {
      emailText = 'Welcome, Merchant! Your account has been created successfully.';
    } else if (userType === 'admin') {
      emailText = 'Welcome, Admin! Your account has been created successfully.';
    }

    // Send the email
    await this.emailService.sendMail(email, emailSubject, emailText);

    return { status: 'User created and email sent' };
  }

 
  @Post('login')
  async loginUser(@Body('phoneNumber') phoneNumber: string, message: string) {
    await this.userService.loginUser(phoneNumber, message);
    return { status: 'message sent successfully' };
  }

   
  @Post('login-otp')
  async loginUserOtp(@Body('phoneNumber') to: string) {
    await this.userService.loginUserSms(to);
    return { status: 'OTP sent successfully' };
  }


  @Post('reset-password')
  async resetPassword(@Body('email') email: string) {
     const resetLink = `https://yourapp.com/reset-password`;
    await this.appService.sendPasswordResetEmail(email, resetLink);
    return { status: 'Password reset email sent' };
  }

  
  @Post('merchant-approved')
  async merchantApproved(@Body('email') email: string, emailSubject:string) {
    await this.appService.merchantApproved(email);
    return { status: 'merchant-approved' , emailSubject};
  }


  @Post('merchant-decline')
  async merchantDeclined(@Body('email') email: string) {
    await this.appService.merchantDeclined(email)
    return { status: 'merchant declined'};
  }


  @Post('cash-out')
  async cashout(@Body('email') email: string) {
    await this.appService.cashOut(email)
    return { status: 'cash out successful'};
  }

  @Post('settlements')
  async settlements(@Body('email') email: string) {
    await this.appService.settlements(email)
    return { status: 'settlement successful'};
  }




  
}
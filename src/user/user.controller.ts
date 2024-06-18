import { Controller, Post, Body } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { EmailService } from '../email-service/email-service.service';
import { AppService } from './../app.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly appService: AppService,
  ) {}



 //create user message
  @Post('create')
  async createUserHttp(@Body('email') email: string, @Body('userType') userType: string) {
    return this.createUser({ email, userType });
  }

  @EventPattern('user.create')
  async createUser(@Payload() data: { email: string; userType: string }) {
    const { email, userType } = data;
    await this.userService.createUser(email, userType);

    let emailSubject = 'Account Created Successfully';
    let emailText = 'Your account has been created successfully.';

    if (userType === 'merchant') {
      emailText = 'Welcome, Merchant! Your account has been created successfully.';
    } else if (userType === 'admin') {
      emailText = 'Welcome, Admin! Your account has been created successfully.';
    }

    await this.emailService.sendMail(email, emailSubject, emailText);
    return { status: 'User created and email sent' };
  }


  //login message
  @Post('login')
  async loginUserHttp(@Body('phoneNumber') phoneNumber: string, @Body('message') message: string) {
    return this.loginUser({ phoneNumber, message });
  }

  @EventPattern('user.login')
  async loginUser(@Payload() data: { phoneNumber: string; message: string }) {
    const { phoneNumber, message } = data;
    await this.userService.loginUser(phoneNumber, message);
    return { status: 'Message sent successfully' };
  }




  //login-otp message
  @Post('login-otp')
  async loginUserOtpHttp(@Body('phoneNumber') phoneNumber: string) {
    return this.loginUserOtp({ phoneNumber });
  }

  @EventPattern('user.loginOtp')
  async loginUserOtp(@Payload() data: { phoneNumber: string }) {
    const { phoneNumber } = data;
    await this.userService.loginUserSms(phoneNumber);
    return { status: 'OTP sent successfully' };
  }



  //reset-password message

  @Post('reset-password')
  async resetPasswordHttp(@Body('email') email: string) {
    return this.resetPassword({ email });
  }

  @EventPattern('user.resetPassword')
  async resetPassword(@Payload() data: { email: string }) {
    const { email } = data;
    const resetLink = `https://yourapp.com/reset-password`;
    await this.appService.sendPasswordResetEmail(email, resetLink);
    return { status: 'Password reset email sent' };
  }



  //merchant-approved message
  @Post('merchant-approved')
  async merchantApprovedHttp(@Body('email') email: string, @Body('emailSubject') emailSubject: string) {
    return this.merchantApproved({ email, emailSubject });
  }

  @EventPattern('user.merchantApproved')
  async merchantApproved(@Payload() data: { email: string; emailSubject: string }) {
    const { email, emailSubject } = data;
    await this.appService.merchantApproved(email);
    return { status: 'Merchant approved', emailSubject };
  }



  //merchant decline message
  @Post('merchant-decline')
  async merchantDeclinedHttp(@Body('email') email: string) {
    return this.merchantDeclined({ email });
  }

  @EventPattern('user.merchantDeclined')
  async merchantDeclined(@Payload() data: { email: string }) {
    const { email } = data;
    await this.appService.merchantDeclined(email);
    return { status: 'Merchant declined' };
  }


  //cahsout sucessgull message

  @Post('cash-out')
  async cashoutHttp(@Body('email') email: string) {
    return this.cashout({ email });
  }

  @EventPattern('user.cashOut')
  async cashout(@Payload() data: { email: string }) {
    const { email } = data;
    await this.appService.cashOut(email);
    return { status: 'Cash out successful' };
  }



  //settlement successful message 
  @Post('settlements')
  async settlementsHttp(@Body('email') email: string) {
    return this.settlements({ email });
  }

  @EventPattern('user.settlements')
  async settlements(@Payload() data: { email: string }) {
    const { email } = data;
    await this.appService.settlements(email);
    return { status: 'Settlement successful' };
  }
}
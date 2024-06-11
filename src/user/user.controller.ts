import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { EmailService } from 'src/email-service/email-service.service';
import { AppService } from 'src/app.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly appService: AppService,
  ) {}

  @Post('create')
  async createUser(@Body('email') email: string, @Body('userType') userType: string) {
    await this.userService.createUser(email, userType);

    // Determine the welcome message based on user type
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
    return { status: 'merchant-decline'};
  }


  
}
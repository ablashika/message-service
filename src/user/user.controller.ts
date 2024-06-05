import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { EmailService } from 'src/email-service/email-service.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private readonly emailService: EmailService,) {}

  @Post('create')
  async createUser(@Body('email') email: string) {


    await this.userService.createUser(email);

       // Call the service method to create the user
       await this.userService.createUser(email);

       // After user creation, send an email
       const emailSubject = 'Account Created Successfully';
       const emailText = 'Your account has been created successfully.';
       await this.emailService.sendMail(email, emailSubject, emailText);
 
    return { status: 'User created and email sent' };
  }
}
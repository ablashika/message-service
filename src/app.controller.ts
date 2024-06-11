import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailRequestDto } from './email-service/dto/email-request-dto';
import { EmailResponseDto } from './email-service/dto/email-response-dto';
import { Subject } from 'rxjs';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

 
  @Post('send-email')
  async sendEmail(@Body() emailRequest: EmailRequestDto): Promise<EmailResponseDto> {
    return this.appService.sendEmail(emailRequest);
  }

@Post('reset-password')
async resetPassword(@Body('email') email: string) {
  const resetLink = `https://yourapp.com/reset-password?email=${email}&token=someRandomToken`; // Generate a reset link
  await this.appService.sendPasswordResetEmail(email, resetLink);
  return { status: 'Password reset email sent' };
}


@Post('merchant-approval')
async merchantApproval(@Body('email') email:string) {

  await this.appService.merchantApproved(email);
  return { status: 'Password reset email sent' };
}


@Post('merchant-decline')
async merchantDecline(@Body('email') email: string ){
  await this.appService.merchantDeclined(email);
  return { status: 'Merchant decline email sent' };
}




}



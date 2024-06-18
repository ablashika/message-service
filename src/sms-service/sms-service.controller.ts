
import { Controller, Post, Body } from '@nestjs/common';
import { SmsService } from './sms-service.service';
import { OtpDto } from 'src/user/dto/Otp.dto';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}
 
  @Post('send')
  async sendSms(@Body() body: { to: string; message: string }) {
    const { to, message } = body;
    await this.smsService.sendSms(to, message);
    return { message: 'SMS sent successfully' };
  }

  @Post('send-otp')
  async sendOtp(@Body() body: { phoneNumber: string }) {
    const { phoneNumber } = body;
    await this.smsService.sendOtp(phoneNumber);
    return { message: 'OTP sent successfully' };
  }


 }
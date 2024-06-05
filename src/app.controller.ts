import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailRequestDto } from './email-service/dto/email-request-dto';
import { EmailResponseDto } from './email-service/dto/email-response-dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

 
  @Post('send-email')
  async sendEmail(@Body() emailRequest: EmailRequestDto): Promise<EmailResponseDto> {
    return this.appService.sendEmail(emailRequest);
  }
}

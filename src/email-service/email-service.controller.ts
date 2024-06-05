// import { Controller } from '@nestjs/common';

// @Controller('email-service')
// export class EmailServiceController {}

import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EmailService } from './email-service.service';


@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('send_email')
  async handleSendEmail(data: { to: string; subject: string; text: string }) {
    await this.emailService.sendMail(data.to, data.subject, data.text);
  }

  @EventPattern('user_created')
  async handleUserCreated(data: { email: string }) {
    const emailData = {
      to: data.email,
      subject: 'Account Created Successfully',
      text: 'Your account has been created successfully.',
    };
    await this.emailService.sendMail(emailData.to, emailData.subject, emailData.text);
  }
}
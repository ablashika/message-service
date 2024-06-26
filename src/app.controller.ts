import { Controller} from '@nestjs/common';
import { AppService } from './app.service';
import { EmailRequestDto } from './email-service/dto/email-request-dto';
import { EmailResponseDto } from './email-service/dto/email-response-dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

 
  @MessagePattern('user_created')
  async handleUserCreated(@Payload() data: { email: string, userType: string }): Promise<{ status: string }> {
    try {
      await this.appService.createUser(data.email, data.userType);
      return { status: 'User created successfully' };
    } catch (error) {
      return { status: 'Error creating user' };
    }
  }
  @MessagePattern('send-email')
  async sendEmail(@Payload() emailRequest: EmailRequestDto): Promise<EmailResponseDto> {
    return this.appService.sendEmail(emailRequest);
  }

  @EventPattern('reset-password')
  async resetPassword(@Payload() data: { email: string }) {
    const resetLink = `https://yourapp.com/reset-password?email=${data.email}`;
    console.log(data) 
    await this.appService.sendPasswordResetEmail(data.email, resetLink);
  }

  @EventPattern('merchant-approval')
  async merchantApproval(@Payload() data: { email: string }) {
    await this.appService.merchantApproved(data.email);
  }

  @EventPattern('merchant-decline')
  async merchantDecline(@Payload() data: { email: string }) {
    await this.appService.merchantDeclined(data.email);
  }
}


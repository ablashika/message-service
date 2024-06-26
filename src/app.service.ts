import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ClientProxy, Transport, ClientProxyFactory } from '@nestjs/microservices';
import { EmailRequestDto } from './email-service/dto/email-request-dto';
import { EmailResponseDto } from './email-service/dto/email-response-dto';
import { EmailService } from './email-service/email-service.service';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);
  private natsClient: ClientProxy;

  constructor(private readonly emailService: EmailService) {}

  async onModuleInit() {
    this.natsClient = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        servers: [process.env.NATS_URL || 'nats://nats:4222'],
      },
    });
    await this.natsClient.connect();
  }

  async publishEvent(pattern: string, data: any) {
    this.natsClient.emit(pattern, data);
    this.logger.log(`Event published: ${pattern} with data: ${JSON.stringify(data)}`);
  }

  async sendEmail(request: EmailRequestDto): Promise<EmailResponseDto> {
    try {
      return await this.natsClient.send<EmailResponseDto>('send_email', request).toPromise();
    } catch (error) {
      this.logger.error('Error sending email:', error.message);
      throw error;
    }
  }

  async createUser(email: string,  userType: string): Promise<void> {
    try {
      let emailSubject = 'Account Created Successfully';
      let emailText = 'Your account has been created successfully.';

      if (userType === 'merchant') {
        emailText = 'Welcome, Merchant! Your account has been created successfully.';
      } else if (userType === 'admin') {
        emailText = 'Welcome, Admin! Your account has been created successfully.';
      }
      this.logger.log(`User created: ${email}, Type: ${userType}`);
      await this.emailService.sendMail(email, emailSubject, emailText);
      await this.publishEvent('user_created', { email, userType });
    } catch (error) {
      this.logger.error('Error creating user:', error);
      throw error;
    
    }
  }
  async sendPasswordResetEmail(email: string, resetLink: string) {
    try {
      await this.emailService.resetEmailPassword(email, resetLink);
      this.logger.log('Password reset email sent successfully');
      await this.publishEvent('reset-password', { email, resetLink });
    } catch (error) {
      this.logger.error('Error sending password reset email:', error.message);
      throw error;
    }
  }

  async merchantApproved(email: string) {
    try {
      await this.emailService.merchantApprove(email);
      this.logger.log('Merchant approval email sent successfully');
      await this.publishEvent('merchant-approval', { email });
    } catch (error) {
      this.logger.error('Error sending merchant approval email:', error.message);
      throw error;
    }
  }

  async merchantDeclined(email: string) {
    try {
      await this.emailService.merchantDecline(email);
      this.logger.log('Merchant decline email sent successfully');
      await this.publishEvent('merchant-decline', { email });
    } catch (error) {
      this.logger.error('Error sending merchant decline email:', error.message);
      throw error;
    }
  }

  async cashOut(email: string) {
    try {
      await this.emailService.cashOut(email);
      this.logger.log('Cash out email sent successfully');
      await this.publishEvent('cash-out', { email });
    } catch (error) {
      this.logger.error('Error sending cash out email:', error.message);
      throw error;
    }
  }

  async settlements(email: string) {
    try {
      await this.emailService.settlements(email);
      this.logger.log('Settlement email sent successfully');
      await this.publishEvent('settlements', { email });
    } catch (error) {
      this.logger.error('Error sending settlement email:', error.message);
      throw error;
    }
  }

}

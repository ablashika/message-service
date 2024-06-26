import { Injectable,Logger, } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory} from '@nestjs/microservices';
import {natsConfig} from '../config/config'
import { SmsService } from '../sms-service/sms-service.service';
import { EmailService } from '../email-service/email-service.service';
import { EventPattern, Payload } from '@nestjs/microservices';


@Injectable()
export class UserService {
  private client: ClientProxy;
  constructor(
    private readonly logger: Logger,
    private readonly smsService: SmsService, 
    private  readonly emailService: EmailService 

  )
   {
    this.client = ClientProxyFactory.create(natsConfig);
    this.logger = new Logger(UserService.name);
    
  }
  async loginUser(to: string, message: string,): Promise<void> {
    try {
      const otp = await this.smsService.sendSms(to,message);
      this.logger.log(`OTP sent to ${to}`, otp);
      await this.client.emit('user_logged_in', { to }).toPromise();
    } catch (error) {
      this.logger.error('Error sending OTP:', error);
      throw error;
    }
  }

  async loginUserSms(to: string): Promise<void> {
    try {
      const otp = await this.smsService.sendOtp(to);
      this.logger.log(`OTP sent to ${to}`, otp);
    } catch (error) {
      this.logger.error('Error sending OTP:', error);
      throw error;
    }
  }

  
  
}
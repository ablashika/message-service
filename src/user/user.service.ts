import { Injectable,Logger, } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory} from '@nestjs/microservices';
import {natsConfig} from '../config/config'
import { SmsService } from '../sms-service/sms-service.service';


@Injectable()
export class UserService {
  private client: ClientProxy;
  constructor(
    private readonly logger: Logger,
    private readonly smsService: SmsService 

  )
   {
    this.client = ClientProxyFactory.create(natsConfig);
    this.logger = new Logger(UserService.name);
    
  }

  async createUser(email: string,  userType: string): Promise<void> {
   try{
    this.logger.log(`User created: ${email}, Type: ${userType}`);
    await this.client.emit('user_created', { email, userType }).toPromise();
   }
   catch(error){
    this.logger.error('Error creating user:',);
    throw error;


   }

  }
  async loginUser(to: string, message: string,): Promise<void> {
    try {
      const otp = await this.smsService.sendSms(to,message);
      this.logger.log(`OTP sent to ${to}`, otp);
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
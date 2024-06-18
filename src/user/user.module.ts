import { Module, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmailService } from '../email-service/email-service.service';
import { AppService } from '../app.service';
import { ClientsModule,Transport  } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios'; 
import { SmsService } from '../sms-service/sms-service.service';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          url: 'nats://nats:4222',
      },
    }
    ]),
  ],
  providers: [UserService, EmailService, AppService,  Logger, SmsService ],
  controllers: [UserController]
})
export class UserModule {}

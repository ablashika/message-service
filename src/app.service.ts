// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AppService {
//   getHello(): string {
//     return 'Hello World!';
//   }
// }
// apps/main-app/src/app.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { EmailRequestDto } from './email-service/dto/email-request-dto';
import { EmailResponseDto } from './email-service/dto/email-response-dto';

@Injectable()
export class AppService implements OnModuleInit {
  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'email_queue',
      queueOptions: {
        durable: false,
      },
    },
  })
  private emailClient: ClientProxy;

  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'sms_queue',
      queueOptions: {
        durable: false,
      },
    },
  })
  private smsClient: ClientProxy;

  async onModuleInit() {
    await this.emailClient.connect();
    await this.smsClient.connect();
  }

  async sendEmail(request: EmailRequestDto): Promise<EmailResponseDto> {
    return this.emailClient.send<EmailResponseDto>('send-email', request).toPromise();
  }

  
}

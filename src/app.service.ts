// import { Injectable, OnModuleInit , Logger} from '@nestjs/common';
// import { Client, ClientProxy, Transport } from '@nestjs/microservices';
// import { EmailRequestDto } from './email-service/dto/email-request-dto';
// import { EmailResponseDto } from './email-service/dto/email-response-dto';

// @Injectable()
// export class AppService implements OnModuleInit {
//   private readonly logger = new Logger(AppService.name);
//   @Client({
//     transport: Transport.NATS,
//     options: {
//       servers: ['nats://localhost:4222'], 
//     },
//   })
//   private natsClient: ClientProxy;

//   async onModuleInit() {
//     await this.natsClient.connect();
//   }

//   // async sendEmail(request: EmailRequestDto): Promise<EmailResponseDto> {
//   //   return this.natsClient.send<EmailResponseDto>('send-email', request).toPromise();
//   // }

//   // async sendPasswordResetEmail(email: string, resetLink: string) {
//   //   const emailRequest: EmailRequestDto = {
//   //     to: email,
//   //     subject: 'Password Reset Request',
//   //     text: `Click the link to reset your password: ${resetLink}`,
//   //   };
//   //   return this.sendEmail(emailRequest);
//   // }

//   async sendEmail(request: EmailRequestDto): Promise<EmailResponseDto> {
//     try {
//       return await this.natsClient.send<EmailResponseDto>('send_email', request).toPromise();
//     } catch (error) {
//       this.logger.error('Error sending email:', error.message);
//       throw error;
//     }
//   }

//   async sendPasswordResetEmail(email: string, resetLink: string) {
//     const emailRequest: EmailRequestDto = {
//       to: email,
//       subject: 'Password Reset Request',
//       text: `Click the link to reset your password: ${resetLink}`,
//     };
//     return this.sendEmail(emailRequest);
//   }


// }

// import { Injectable, OnModuleInit , Logger} from '@nestjs/common';
// import { Client, ClientProxy, Transport, ClientProxyFactory } from '@nestjs/microservices';
// import { EmailRequestDto } from './email-service/dto/email-request-dto';
// import { EmailResponseDto } from './email-service/dto/email-response-dto';
// import { EmailService } from './email-service/email-service.service';

// @Injectable()
// export class AppService implements OnModuleInit {
//   private readonly logger = new Logger(AppService.name);
//   private natsClient: ClientProxy;

//   async onModuleInit() {
//     this.natsClient = ClientProxyFactory.create({
//       transport: Transport.NATS,
//       options: {
//         servers: ['nats://localhost:4222'], 
//       },
//     });
//     await this.natsClient.connect();
//   }

//   async sendEmail(request: EmailRequestDto): Promise<EmailResponseDto> {
//     try {
//       return await this.natsClient.send<EmailResponseDto>('send_email', request).toPromise();
//     } catch (error) {
//       this.logger.error('Error sending email:', error.message);
//       throw error;
//     }
//   }

//   async sendPasswordResetEmail(email: string, resetLink: string) {
//     const subject = 'Password Reset Request';
//     const text = `Click the link to reset your password: ${resetLink}`;

//     try {
//       await this.resetEmailPassword(email, subject, text);
//       this.logger.log('Password reset email sent successfully');
//     } catch (error) {
//       this.logger.error('Error sending password reset email:', error.message);
//       throw error;
//     }
//   }
// }

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
         servers: ['nats://nats:4222'],
      },
    });
    await this.natsClient.connect();
  }

  async sendEmail(request: EmailRequestDto): Promise<EmailResponseDto> {
    try {
      return await this.natsClient.send<EmailResponseDto>('send_email', request).toPromise();
    } catch (error) {
      this.logger.error('Error sending email:', error.message);
      throw error;
    }
  }

  async sendPasswordResetEmail(email: string, resetLink: string) {
    const subject = 'Password Reset Request';
    const text = `Click the link to reset your password: ${resetLink}`;

    try {
      await this.emailService.resetEmailPassword(email, subject, text);
      this.logger.log('Password reset email sent successfully');
    } catch (error) {
      this.logger.error('Error sending password reset email:', error.message);
      throw error;
    }
  }

  async merchantApproved(email: string) {
      const subject = 'merchant Approved';
     const text = 'merchant Approved successfully';

    try {
      await this.emailService.merchantApprove(email, subject,text);
      this.logger.log('merchant approve successfull');
    } catch (error) {
      this.logger.error('merchant approval failed', error.message);
      throw error;
    }
  }

  async merchantDeclined(email: string) {
    const subject = 'Merchant Application Declined';
    const text = `Dear Merchant,

We regret to inform you that your application for a merchant account has been declined for the following reason(s):


Please feel free to reach out to us if you have any questions or if you believe this decision was made in error.

Best regards,
Your Company Name`;

    try {
      await this.emailService.merchantDecline(email, subject, text);
      this.logger.log('Merchant decline email sent successfully');
    } catch (error) {
      this.logger.error('Merchant decline failed', error.message);
      throw error;
    }
  }


  async cashOut(email: string) {
    const subject = 'Cash Out Successfull';
   const text = `Dear Merchant,
   Cash-out was successful

   Please feel free to reach out to us if you have any questions or if you believe this decision was made in error.

   Best regards,
   Your Company Name
   `;

  try {
    await this.emailService.cashOut(email, subject,text);
    this.logger.log('merchant approved successfull');
  } catch (error) {
    this.logger.error('merchant approval failed', error.message);
    throw error;
  }
}



async settlements(email: string) {
  const subject = 'Bank Transfer Success';
 const text = `Dear Merchant,
 Settlement was successful

 Please feel free to reach out to us if you have any questions or if you believe this decision was made in error.

 Best regards,
 Your Company Name
 `;

try {
  await this.emailService.cashOut(email, subject,text);
  this.logger.log('settlement successfull');
} catch (error) {
  this.logger.error('settlement failed', error.message);
  throw error;
}
}

}





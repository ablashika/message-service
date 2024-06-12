import { Module, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmailService } from 'src/email-service/email-service.service';
import { AppService } from 'src/app.service';
import { ClientsModule,Transport  } from '@nestjs/microservices';

@Module({
  imports: [
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
  providers: [UserService, EmailService, AppService,  Logger],
  controllers: [UserController]
})
export class UserModule {}

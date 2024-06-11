import { Module, Logger } from '@nestjs/common';
import { ClientsModule,Transport  } from '@nestjs/microservices';
import { EmailService} from './email-service.service';
import { EmailController } from './email-service.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          url: 'nats://localhost:4222',
      },
    }
    ]),
  ],
  providers: [EmailService, Logger],
  controllers: [EmailController],
})
export class EmailModule {}
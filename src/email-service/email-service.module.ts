import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { EmailService } from './email-service.service';
import { EmailController } from './email-service.controller';
import { rabbitMqConfig } from 'src/config/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        ...rabbitMqConfig,
      },
    ]),
  ],
  providers: [EmailService],
  controllers: [EmailController],
})
export class EmailModule {}
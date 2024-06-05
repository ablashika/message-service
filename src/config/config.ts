import { Transport, ClientOptions } from '@nestjs/microservices';

export const rabbitMqConfig: ClientOptions = {
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://guest:guest@localhost:5672'],
    queue: 'email_queue',
    queueOptions: {
      durable: false,
    },
  },
};
import { Transport, ClientOptions } from '@nestjs/microservices';

export const natsConfig: ClientOptions = {
    transport: Transport.NATS,
    options: {
      servers: ['nats://localhost:4222'],
      url: 'nats://localhost:4222',
    }
}  

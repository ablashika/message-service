import { Transport, ClientOptions } from '@nestjs/microservices';

export const natsConfig: ClientOptions = {
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats:4222'], // Updated server URL to use container name
    url: 'nats://nats:4222', 
    }
}  

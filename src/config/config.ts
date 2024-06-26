import { Transport, ClientOptions } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

export const natsConfig: ClientOptions = {
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats:4222'], 
    }
}  



import { Transport, ClientOptions } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

export const natsConfig: ClientOptions = {
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats:4222'], // Updated server URL to use container name
    // url: 'nats://nats:4222', 
    }
}  


export const infobipConfig = {
  apiKey: process.env.INFOBIP_API_KEY,
  baseUrl: 'https://y3mzn9.api.infobip.com/sms/3/messages',
};

// const INFOPBIP_API_URL = ;
// const INFOPBIP_API_KEY = 'YOUR_API_KEY_HERE';
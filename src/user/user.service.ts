import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { rabbitMqConfig } from 'src/config/config';


@Injectable()
export class UserService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create(rabbitMqConfig);
  }

  async createUser(email: string): Promise<void> {
    // Implement user creation logic (e.g., save to database)
    // For demonstration purposes, we assume the user is created successfully.

    // Emit the user_created event
    const userCreatedEvent = { email };
    await this.client.emit('user_created', userCreatedEvent).toPromise();
  }
}
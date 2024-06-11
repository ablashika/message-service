import { Injectable,Logger } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory} from '@nestjs/microservices';
import { natsConfig } from 'src/config/config';


@Injectable()
export class UserService {
  private client: ClientProxy;

  constructor(private readonly logger: Logger) {
    this.client = ClientProxyFactory.create(natsConfig);
    this.logger = new Logger(UserService.name);
  }

  async createUser(email: string,  userType: string): Promise<void> {
    // Implement user creation logic (e.g., save to database)
    // For demonstration purposes, we assume the user is created successfully.

    // Emit the user_created event
   try{
    // this.logger.log(`User created: ${email}`);
    this.logger.log(`User created: ${email}, Type: ${userType}`);
    // Emit the user_created event with user type
    await this.client.emit('user_created', { email, userType }).toPromise();
   }
   catch(error){
    this.logger.error('Error creating user:', error.message);
    throw error;


   }

  }
}
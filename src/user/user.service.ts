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


    //more logic goes here, eg.connecting to db
   try{
    // this.logger.log(`User created: ${email}`);
    this.logger.log(`User created: ${email}, Type: ${userType}`);
    // Emit the user_created event with user type
    await this.client.emit('user_created', { email, userType }).toPromise();
   }
   catch(error){
    this.logger.error('Error creating user:',);
    throw error;


   }

  }
}
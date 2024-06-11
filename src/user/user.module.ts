import { Module, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmailService } from 'src/email-service/email-service.service';
import { AppService } from 'src/app.service';

@Module({
  providers: [UserService, EmailService, AppService,  Logger],
  controllers: [UserController]
})
export class UserModule {}

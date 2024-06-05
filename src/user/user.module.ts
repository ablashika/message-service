import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmailService } from 'src/email-service/email-service.service';

@Module({
  providers: [UserService, EmailService],
  controllers: [UserController]
})
export class UserModule {}
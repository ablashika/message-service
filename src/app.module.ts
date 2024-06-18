import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule} from './email-service/email-service.module';
import { UserModule } from './user/user.module';
import { EmailService } from './email-service/email-service.service';
import { SmsService } from './sms-service/sms-service.service';
import { SmsServiceModule } from './sms-service/sms-service.module';

@Module({
  imports: [EmailModule, UserModule,SmsServiceModule] ,
  controllers: [AppController],
  providers: [AppService, EmailService, Logger, SmsService],
})
export class AppModule {}

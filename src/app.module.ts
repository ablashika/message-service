import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule} from './email-service/email-service.module';
import { UserModule } from './user/user.module';
import { EmailService } from './email-service/email-service.service';

@Module({
  imports: [EmailModule, UserModule],
  controllers: [AppController],
  providers: [AppService, EmailService, Logger],
})
export class AppModule {}

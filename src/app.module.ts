import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule} from './email-service/email-service.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [EmailModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

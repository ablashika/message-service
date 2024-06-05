import { Module } from '@nestjs/common';
import { SmsServiceController } from './sms-service.controller';
import { SmsServiceService } from './sms-service.service';

@Module({
  controllers: [SmsServiceController],
  providers: [SmsServiceService]
})
export class SmsServiceModule {}

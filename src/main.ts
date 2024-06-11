import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { natsConfig } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(natsConfig);
  await app.listen(4000);
}
bootstrap();

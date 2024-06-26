import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { natsConfig } from './config/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(natsConfig);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

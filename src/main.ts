import { NestFactory } from '@nestjs/core';
import mongoose from 'mongoose';
import { AppModule } from './app.module';
import { ResponseAddHeaders } from './ResponseAddHeaders';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
    credentials: true,
    methods :["GET","POST","DELETE","PATCH","OPTIONS"]
  });
  // app.useGlobalInterceptors(new ResponseAddHeaders);
  await app.listen( process.env.PORT || 3001);
}
bootstrap();

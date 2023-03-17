import { NestFactory } from '@nestjs/core';
import mongoose from 'mongoose';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin : [
      'http://localhost:3000',
      'https://mongodbweb.onrender.com',
      'https://mongodbweb-app.vercel.app'
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  });
  await app.listen( process.env.PORT || 3001);
}
bootstrap();

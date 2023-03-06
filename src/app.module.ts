import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaModule } from './schema/schema.module';
import { RelationModule } from './relation/relation.module';
import mongoose from 'mongoose';

@Module({
  // imports: [MongooseModule.forRoot('mongodb+srv://sai967621:959CelAhokejPnZj@cluster0.slchmpv.mongodb.net/nest?retryWrites=true&w=majority'), SchemaModule, RelationModule],
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), SchemaModule, RelationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

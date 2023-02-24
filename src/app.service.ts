import { Injectable } from '@nestjs/common';
import mongoose, { Connection } from 'mongoose';
import {InjectConnection, MongooseModule} from '@nestjs/mongoose';
@Injectable()
export class AppService {
  

 getHello() {
  return 'hello'
  }
}

import { Injectable } from '@nestjs/common';
import { CreateRelationDto } from './dto/create-relation.dto';
import { UpdateRelationDto } from './dto/update-relation.dto';
import { InjectConnection} from '@nestjs/mongoose';
import mongoose, { Connection,Schema } from 'mongoose';
import { customer } from './entities/customer';
import { address } from './entities/addreses';
import {ObjectId} from 'mongodb'
import { convertDATAtOsCHEMA } from 'src/schema/common/constants';


@Injectable()
export class RelationService {
  constructor(@InjectConnection() private connection: Connection){}

 async create(createRelationDto) {
  const {schema,relationName,schemeName,data} = createRelationDto;
  let s = {
   ...schema,
    [relationName] : [
        {type: mongoose.Schema.Types.ObjectId,ref: relationName}
    ]
}
console.log('userschema',s);
   let useschema= new Schema(s,{timestamps:true});
   console.log('userschema',useschema);
   const userModal = this.connection.model(schemeName,useschema);
   const user = await userModal.create(data);
   return user;
  }

 async createRelation(id,createRelationDto){
  // console.log('id',id,'createRelation',createRelationDto);
  const {schema,relationName,schemeName,data} = createRelationDto;
   let s = {...schema, [relationName]: {type: mongoose.Schema.Types.ObjectId,ref: relationName}}
   var rel;
   try {
    let relSchema = new Schema(s);
    const relModal = this.connection.model(schemeName,relSchema);
    let resp = await relModal.create({...data,[relationName]:id})
   await resp.save();
   rel = await this.connection.collection(schemeName).findOne({_id: resp._id}); 
   } catch (error) {
    let resp = await this.connection.collection(schemeName).insertOne({...data,[relationName]:id});
     rel = await this.connection.collection(schemeName).findOne({_id: resp.insertedId}); 
   }
   console.log('relsss',rel)
  const user =  await this.connection.collection(relationName).findOne();
  let scheaa: any = convertDATAtOsCHEMA(user);

  var userById = await this.connection.collection(relationName).findOne({_id: new ObjectId(id)});    
  userById[schemeName].push(rel);
   await this.connection.collection(relationName).updateOne({_id: new ObjectId(id)}, {$set: userById});

  return {status:200,data: 'created successfully'}
 } 

 


 async findAll(name:string) {
      const  userModal = await this.connection.collection(name).findOne();
      console.log('userModal',userModal);
      let scheaa: any = convertDATAtOsCHEMA(userModal);
      // console.log('schemaa',scheaa);
      var modal;
      try {
        modal = await this.connection.model(name);
        console.log('calling withought schema')
      } catch (error) {
        modal = await this.connection.model(name,scheaa);
        console.log('calling with schema')
      }
      let data =await modal.find();
      console.log('data',data);
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} relation`;
  }

  update(id: number, updateRelationDto: UpdateRelationDto) {
    let addressSchema = new Schema(address,{timestamps:true});
    let addressModal;
    try {
      addressModal = this.connection.model('Addres',addressSchema);
    } catch (error) {
      addressModal = this.connection.model('Addres');
    }
     
    return `This action updates a #${id} relation`;
  }

  remove(name: string) {
    return this.connection.collection(name).drop();
  }
}

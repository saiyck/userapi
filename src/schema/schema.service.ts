import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CreateSchemaDto, createScheme, getTypeSchema } from './dto/create-schema.dto';
import { UpdateSchemaDto } from './dto/update-schema.dto';
import mongoose, {Schema} from 'mongoose'
import { ConvertColumTypesToSchema, convertFieldsData, createUserSchema,  filterSchemaTypes, getSchema, SchemaType, updateTypes } from './common/constants';
import { async } from 'rxjs';

@Injectable()
export class SchemaService {
  constructor(@InjectConnection() private connection: Connection){}

// create schema
 async create(createSchemaDto,res) {
  console.log('create',createSchemaDto)
    const {schemaName,fields} = createSchemaDto;
    try {
     let result = createUserSchema(fields);
     const blogSchema = new Schema(result.schema,{timestamps : true});
     const blogModal = this.connection.model(schemaName,blogSchema);
     const doc = new blogModal(result.data);
      await doc.save();
      res.send({
        status: 201,
        message: "schema create successfully",
        result
      })
    } catch (error) {
      console.log('error',error)
      res.send({
        status: 400,
        message: error
      })
    }
  }

 //get schema fields 
  async findFields(name){
    try {
      let data=await this.connection.db.collection(name).findOne();
      // let schema =this.connection.model(name).schema;
      let schema = data.schema;
       let fields = convertFieldsData(schema, data);
       const output = {
        status : 200,
        schemeName : name,
        fields
       }
      return output;
    } catch (error) {
      return {
        status : 400,
        message: 'Error'
      };
    }
   
  }


 printSchema (obj) {
    let objs = {}
    for (var key in obj) {
      if(key != "_id"){
      objs[key] = typeof obj[key]
    }
    }
    console.log(objs)
   return objs; 
};


  async createData(createSchemaDto,res){
    console.log('createSchemaDto.data',createSchemaDto.data)
    let data = {...createSchemaDto.data,createdAt : new Date(), updatedAt : new Date()}
    console.log('data',data);
  try {
  let result= await this.connection.db.collection(createSchemaDto.name).insertOne(data);
   // let result= await this.connection.db.collection(createSchemaDto.name).findOne();
       res.send({
        status: 201,
        message: "data create successfully"
      })
  } catch (error) {
    res.send({
      status: 400,
      message: "data not created",
      error : error
    })
  }  
 
  }

 async findAll() {
 let resp = await this.connection.db.listCollections().toArray();
  let response =  resp.map((val,ind)=>{ return {value:ind+1 , name: val.name}})
  return response;
  }

  findOne(schemas: string) {
     let result=this.connection.model('Hello14').schema;
     console.log('result',result.obj);
    return result.obj;
  }

 async update(schema: string, updateSchemaDto) {
    console.log('schema',schema,'data',updateSchemaDto);
   let result= await this.connection.db.collection(schema).updateMany({},{$rename: updateSchemaDto}) 
   let data= await this.connection.db.collection(schema).findOne();
   const types = data.types;
    let final= updateTypes(types,updateSchemaDto);
     await this.connection.db.collection(schema).updateOne({_id: data._id},{$set:{types: final}})
    return {
      status:201,
      message : 'schema has been updated'
    };
  }

  async findAllData(name: string) {
    let  response=[];
    let result =await this.connection.db.collection(name).findOne();
    if(result){
      try {
        let datss = await this.connection.model(name)
        response = await datss.find();
      } catch (error) {
        let datss = await this.connection.model(name,result.schema);
        response = await datss.find();
      }
    }
    // let data = await filterSchemaTypes(response);
    let res = {
      schemaName : name,
      data: response
    }
    return res;
  }

 async remove(schema: string) {
  console.log('schema',schema)
   try {
    let result =await this.connection.db.collection(schema).drop();
    console.log('result',result)
    return {
      status:200,
      message: schema + ' collection deleted successfully'
    }

   } catch (error) {
    return {
      status:400,
      message:schema + ' collection not deleted'
    }
   }
}

async getAllCollectionFields(res){
   let response = []
   let allList = await this.findAll();
  allList.map( async (val,ind)=> {
      const data =await this.findAllData(val.name);
      response.push(data)
     if(response.length == allList.length){
       res.send(response);
     }
   })
}


}


import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CreateSchemaDto, createScheme, getTypeSchema } from './dto/create-schema.dto';
import { UpdateSchemaDto } from './dto/update-schema.dto';
import mongoose, {Schema} from 'mongoose'
import { ConvertColumTypesToSchema, convertFieldsData, createUserSchema,  deleteTypesSchemas,  filterSchemaTypes, getSchema, SchemaType, updateTypes } from './common/constants';
import { async } from 'rxjs';

@Injectable()
export class SchemaService {
  constructor(@InjectConnection() private connection: Connection){}

// create schema
 async create(createSchemaDto,res) {
  // console.log('create',createSchemaDto)
    const {schemaName,fields} = createSchemaDto;
    let data=await this.connection.db.collection(schemaName).findOne();
    console.log('datataa',data)
    if(!data){
    try {
     let result = createUserSchema(fields);
     console.log('result',result)
     const blogSchema = new Schema(result.schema,{timestamps : true,strict: false});
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
  }else{
    res.send({
      status: 400,
      message: "Schema Already exists"
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
   const schemad = data.schema;
    let final= updateTypes(types,updateSchemaDto);
    let finalSchema = updateTypes(schemad,updateSchemaDto);
    console.log('final schema',finalSchema);
     await this.connection.db.collection(schema).updateOne({_id: data._id},{$set:{types: final, schema: finalSchema}})
    return {
      status:201,
      message : 'schema has been updated'
    };
  }

  async deleteSchemaFields(schema:string, deleteSchema) {
    console.log('schema',schema,'data',deleteSchema);
   let result= await this.connection.db.collection(schema).updateMany({},{$unset: deleteSchema}) 
   let data= await this.connection.db.collection(schema).findOne();
   const types = data.types;
   const schemad = data.schema;
    let final= deleteTypesSchemas(types,deleteSchema);
    let finalSchema = deleteTypesSchemas(schemad,deleteSchema);
    console.log('final schema',final);
    await this.connection.db.collection(schema).updateOne({_id: data._id},{$set:{types: final, schema: finalSchema}})
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
        response = await datss.find({},{createdAt:0,updatedAt:0,__v:0});
      } catch (error) {
        let datss = await this.connection.model(name,result.schema);
        response = await datss.find({},{createdAt:0,updatedAt:0,__v:0});
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
   if(allList.length === 0){
    res.send([]);
   }
   for(let i =0; i< allList.length; i++){
    const data = await this.findAllData(allList[i].name);
    response.push(data)
    if(response.length == allList.length){
      res.send(response);
    }
   }
}

async deleteDocument(id,schema){
  let  response;
  let result =await this.connection.db.collection(schema).findOne();
  try {
    let datss = await this.connection.model(schema)
    response = await datss.deleteOne({_id: id});
  } catch (error) {
    let datss = await this.connection.model(schema,result.schema);
    response = await datss.deleteOne({_id: id});
  }
  console.log('ress',response);
  return {
    status:204,
    message:"delete success fully"
  }
}

async updateCollectionData(id,schema,data){
  let  response;
  let result =await this.connection.db.collection(schema).findOne();
  try {
    let datss = await this.connection.model(schema)
    console.log('datss',datss)
    response = await datss.updateMany({_id: id},{$set : data});
    console.log('resstry',response);
  } catch (error) {
    let datss = await this.connection.model(schema,result.schema);
    console.log('datss',datss)
    response = await datss.updateMany({_id: id},{$set : data});
    console.log('resscatch',response);
  }
  console.log('resss',response)
  if(response.acknowledged && response.matchedCount > 0){
    return {
      status:204,
      message:"collection data updated"
    }
  }else if(response.matchedCount == 0){
    return {
      status:400,
      message:"no data found with respect ID"
    }
  }else{
    return {
      status:400,
      message:"Bad Request"
    }
  }
}


}


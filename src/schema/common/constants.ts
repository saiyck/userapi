import mongoose from "mongoose";

export const SchemaType = 'SchemaType';


export const SchemaObject = {
    "number": "Integer",
    "single_text": "String",
    "multi_text": "String",
    "select_options": "String",
    "date": "Date",
    "true_false": "Boolean"
}

export const convertDATAtOsCHEMA =(data)=> {
  let result={}
  let typesKeyVal= Object.entries(data);
  for(let i=0; i< typesKeyVal.length; i++){
    result[typesKeyVal[i][0]] = typeof typesKeyVal[i][1]
  }
  return result;
}

export const ConvertColumTypesToSchema = (types:Object)=> {
    let result={};    
    let typesKeyVal= Object.entries(types);
    for(let i=0; i< typesKeyVal.length; i++){
        //console.log(obj[typesKeyVal[i][1]])
        result[typesKeyVal[i][0]] = SchemaObject[typesKeyVal[i][1]];
    }
    return result;
}

export function getSchema(schema){
  delete schema.types;
  delete schema.schema;
  return schema;
}


export function convertFieldsData(schema,data){
 const types = data.types;
 const arr = []
 delete schema.types;
 delete schema.schema;
 let keys = Object.keys(schema);
 for(let i=0;i<keys.length ;i++){
     delete schema[keys[i]].type
     let obj={
         lable: keys[i],
         type: types[keys[i]],
         value:"",
       ...schema[keys[i]]
     }
     arr.push(obj)
 }
 console.log('arr',arr)
 return arr;
}

export function createUserSchema(fields){
    let schema ={}
    let data = {}
    let type = {}
   for(let i=0;i<fields.length;i++){
       let lable =fields[i]['lable'];
       let value = fields[i].value;
        data[lable] = value;
       type[lable] = fields[i].type 
       delete fields[i].lable
       delete fields[i].value
       fields[i] = {...fields[i], type: typeof value}
       schema[lable] = fields[i]
   }
   console.log('schemaaaa',schema);
   schema['types'] = {type : 'object', required: false};
   data['types'] = type;
   schema['schema'] = {type : 'object', required: false};
   data['schema'] = schema;
  return {schema, data};
}

export function updateTypes(types,data:Object){
  let entries = Object.entries(data);
  for(let i=0;i<entries.length;i++){
    types[entries[i][1]] = types[entries[i][0]]
    delete types[entries[i][0]]
  }
  return types;
}

export function deleteTypesSchemas(values,data:any){
   let keys = Object.keys(data);
   for(let i=0; i<keys.length; i++){
      delete values[keys[i]]
   }
   return values;
}

export const filterSchemaTypes = async (data:any) => {
    // let temp [...data];
    // let temp = [...data];
    let firstObj = data[0]
   delete firstObj['types']
    // delete data[0].schema
    // delete data[0]['types']
    console.log('temp',firstObj)
    return data;
}

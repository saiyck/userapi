import { Controller, Get, Body, Patch, Param, Delete, Res, Query, Post } from '@nestjs/common';
import { SchemaService } from './schema.service';
import { CreateSchemaDto, DeleteSchemaDto } from './dto/create-schema.dto';
import { UpdateSchemaDto } from './dto/update-schema.dto';
import { Response } from 'express';

@Controller('schema')
export class SchemaController {

  constructor(private readonly schemaService: SchemaService) {}

  @Post('create')
  create(@Body() createSchemaDto, @Res() res: Response) {
    console.log('createSchemaDto',createSchemaDto);
    this.schemaService.create(createSchemaDto,res);
  }

  @Post('add')
  postData(@Body() createSchemaDto, @Res() res: Response) {
    this.schemaService.createData(createSchemaDto,res);
  }

  @Get('list')
 async findAll() {
   return await this.schemaService.findAll();
  }

  @Get(':id')
  findFields(@Query('name') name: string) {
    console.log('calling fields')
    return this.schemaService.findFields(name);
  }

  @Get('getAll/data')
  findAllData(@Query('name') name: string){
    console.log('calling')
    return this.schemaService.findAllData(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('findOne');
    return this.schemaService.findOne(id);
  }

  @Patch('update/data')
  update(@Query('schema') schema: string, @Body() updateSchemaDto: UpdateSchemaDto) {
    console.log('calling update')
    return this.schemaService.update(schema, updateSchemaDto);
  }

  @Delete('delete/fields')
  deleteSchemaFields(@Query('schema') schema: string, @Body() deleteSvhemaDto : DeleteSchemaDto){
    return this.schemaService.deleteSchemaFields(schema,deleteSvhemaDto);
  }

  @Get('getAllCollections/all')
  getAllCollections(@Res() res: Response){
    this.schemaService.getAllCollectionFields(res);
  }

  @Delete(':schema')
  remove(@Param('schema') schema: string) {
    return this.schemaService.remove(schema);
  } 


  @Delete('delete/:id')
  deleteDocument(@Param('id') id: string, @Query('schema') schema:string){
     return this.schemaService.deleteDocument(id,schema);
  }

  @Patch('update/data/:id')
  updateCollectionData(@Param('id') id: string, @Query('schema') schema:string, @Body() updateSchema: any){
    console.log('request',id,schema,updateSchema);
    return this.schemaService.updateCollectionData(id,schema,updateSchema);
  }
  
  
}


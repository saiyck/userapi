import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RelationService } from './relation.service';
import { CreateRelationDto } from './dto/create-relation.dto';
import { UpdateRelationDto } from './dto/update-relation.dto';

@Controller('relation')
export class RelationController {
  constructor(private readonly relationService: RelationService) {}

  @Post()
  create(@Body() createRelationDto: CreateRelationDto) {
    console.log('calling relation')
    return this.relationService.create(createRelationDto);
  }
  
  @Post('create')
  createRelation(@Query('id') id:number, @Body() createRelationDto: CreateRelationDto){
    // console.log('calling relation create')
    return this.relationService.createRelation(id,createRelationDto);
  }

  @Get()
  findAll(@Query('name') name: string) {
    return this.relationService.findAll(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.relationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRelationDto: UpdateRelationDto) {
    return this.relationService.update(+id, updateRelationDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.relationService.remove(name);
  }
}

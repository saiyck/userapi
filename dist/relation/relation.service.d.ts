import { UpdateRelationDto } from './dto/update-relation.dto';
import { Connection } from 'mongoose';
export declare class RelationService {
    private connection;
    constructor(connection: Connection);
    create(createRelationDto: any): Promise<any>;
    createRelation(id: any, createRelationDto: any): Promise<{
        status: number;
        data: string;
    }>;
    findAll(name: string): Promise<any>;
    findOne(id: number): string;
    update(id: number, updateRelationDto: UpdateRelationDto): string;
    remove(name: string): Promise<boolean>;
}

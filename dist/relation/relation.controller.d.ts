import { RelationService } from './relation.service';
import { CreateRelationDto } from './dto/create-relation.dto';
import { UpdateRelationDto } from './dto/update-relation.dto';
export declare class RelationController {
    private readonly relationService;
    constructor(relationService: RelationService);
    create(createRelationDto: CreateRelationDto): Promise<any>;
    createRelation(id: number, createRelationDto: CreateRelationDto): Promise<{
        status: number;
        data: string;
    }>;
    findAll(name: string): Promise<any>;
    findOne(id: string): string;
    update(id: string, updateRelationDto: UpdateRelationDto): string;
    remove(name: string): Promise<boolean>;
}

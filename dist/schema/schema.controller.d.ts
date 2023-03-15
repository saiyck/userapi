import { SchemaService } from './schema.service';
import { DeleteSchemaDto } from './dto/create-schema.dto';
import { UpdateSchemaDto } from './dto/update-schema.dto';
import { Response } from 'express';
export declare class SchemaController {
    private readonly schemaService;
    constructor(schemaService: SchemaService);
    create(createSchemaDto: any, res: Response): void;
    postData(createSchemaDto: any, res: Response): void;
    findAll(): Promise<{
        value: number;
        name: string;
    }[]>;
    findFields(name: string): Promise<{
        status: number;
        schemeName: any;
        fields: any[];
    } | {
        status: number;
        message: string;
    }>;
    findAllData(name: string): Promise<{
        schemaName: string;
        data: any[];
    }>;
    findOne(id: string): {
        [path: string]: import("mongoose").SchemaDefinitionProperty<undefined>;
    } | {
        [x: string]: import("mongoose").SchemaDefinitionProperty<any>;
    };
    update(schema: string, updateSchemaDto: UpdateSchemaDto): Promise<{
        status: number;
        message: string;
    }>;
    deleteSchemaFields(schema: string, deleteSvhemaDto: DeleteSchemaDto): Promise<{
        status: number;
        message: string;
    }>;
    getAllCollections(res: Response): void;
    remove(schema: string): Promise<{
        status: number;
        message: string;
    }>;
    deleteDocument(id: string, schema: string): Promise<{
        status: number;
        message: string;
    }>;
    updateCollectionData(id: string, schema: string, updateSchema: any): Promise<{
        status: number;
        message: string;
    }>;
}

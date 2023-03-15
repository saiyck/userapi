import { Connection } from 'mongoose';
import mongoose from 'mongoose';
export declare class SchemaService {
    private connection;
    constructor(connection: Connection);
    create(createSchemaDto: any, res: any): Promise<void>;
    findFields(name: any): Promise<{
        status: number;
        schemeName: any;
        fields: any[];
    } | {
        status: number;
        message: string;
    }>;
    printSchema(obj: any): {};
    createData(createSchemaDto: any, res: any): Promise<void>;
    findAll(): Promise<{
        value: number;
        name: string;
    }[]>;
    findOne(schemas: string): {
        [path: string]: mongoose.SchemaDefinitionProperty<undefined>;
    } | {
        [x: string]: mongoose.SchemaDefinitionProperty<any>;
    };
    update(schema: string, updateSchemaDto: any): Promise<{
        status: number;
        message: string;
    }>;
    deleteSchemaFields(schema: string, deleteSchema: any): Promise<{
        status: number;
        message: string;
    }>;
    findAllData(name: string): Promise<{
        schemaName: string;
        data: any[];
    }>;
    remove(schema: string): Promise<{
        status: number;
        message: string;
    }>;
    getAllCollectionFields(res: any): Promise<void>;
    deleteDocument(id: any, schema: any): Promise<{
        status: number;
        message: string;
    }>;
    updateCollectionData(id: any, schema: any, data: any): Promise<{
        status: number;
        message: string;
    }>;
}

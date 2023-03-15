export declare const SchemaType = "SchemaType";
export declare const SchemaObject: {
    number: string;
    single_text: string;
    multi_text: string;
    select_options: string;
    date: string;
    true_false: string;
};
export declare const convertDATAtOsCHEMA: (data: any) => {};
export declare const ConvertColumTypesToSchema: (types: Object) => {};
export declare function getSchema(schema: any): any;
export declare function convertFieldsData(schema: any, data: any): any[];
export declare function createUserSchema(fields: any): {
    schema: {};
    data: {};
};
export declare function updateTypes(types: any, data: Object): any;
export declare function deleteTypesSchemas(values: any, data: any): any;
export declare const filterSchemaTypes: (data: any) => Promise<any>;

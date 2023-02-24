"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterSchemaTypes = exports.updateTypes = exports.createUserSchema = exports.convertFieldsData = exports.getSchema = exports.ConvertColumTypesToSchema = exports.convertDATAtOsCHEMA = exports.SchemaObject = exports.SchemaType = void 0;
exports.SchemaType = 'SchemaType';
exports.SchemaObject = {
    "number": "Integer",
    "single_text": "String",
    "multi_text": "String",
    "select_options": "String",
    "date": "Date",
    "true_false": "Boolean"
};
const convertDATAtOsCHEMA = (data) => {
    let result = {};
    let typesKeyVal = Object.entries(data);
    for (let i = 0; i < typesKeyVal.length; i++) {
        result[typesKeyVal[i][0]] = typeof typesKeyVal[i][1];
    }
    return result;
};
exports.convertDATAtOsCHEMA = convertDATAtOsCHEMA;
const ConvertColumTypesToSchema = (types) => {
    let result = {};
    let typesKeyVal = Object.entries(types);
    for (let i = 0; i < typesKeyVal.length; i++) {
        result[typesKeyVal[i][0]] = exports.SchemaObject[typesKeyVal[i][1]];
    }
    return result;
};
exports.ConvertColumTypesToSchema = ConvertColumTypesToSchema;
function getSchema(schema) {
    delete schema.types;
    delete schema.schema;
    return schema;
}
exports.getSchema = getSchema;
function convertFieldsData(schema, data) {
    const types = data.types;
    const arr = [];
    delete schema.types;
    delete schema.schema;
    let keys = Object.keys(schema);
    for (let i = 0; i < keys.length; i++) {
        delete schema[keys[i]].type;
        let obj = Object.assign({ lable: keys[i], type: types[keys[i]], value: "" }, schema[keys[i]]);
        arr.push(obj);
    }
    console.log('arr', arr);
    return arr;
}
exports.convertFieldsData = convertFieldsData;
function createUserSchema(fields) {
    let schema = {};
    let data = {};
    let type = {};
    for (let i = 0; i < fields.length; i++) {
        let lable = fields[i]['lable'];
        let value = fields[i].value;
        data[lable] = value;
        type[lable] = fields[i].type;
        delete fields[i].lable;
        delete fields[i].value;
        fields[i] = Object.assign(Object.assign({}, fields[i]), { type: typeof value });
        schema[lable] = fields[i];
    }
    console.log('schemaaaa', schema);
    schema['types'] = { type: 'object', required: false };
    data['types'] = type;
    schema['schema'] = { type: 'object', required: false };
    data['schema'] = schema;
    return { schema, data };
}
exports.createUserSchema = createUserSchema;
function updateTypes(types, data) {
    let entries = Object.entries(data);
    for (let i = 0; i < entries.length; i++) {
        types[entries[i][1]] = types[entries[i][0]];
        delete types[entries[i][0]];
    }
    return types;
}
exports.updateTypes = updateTypes;
const filterSchemaTypes = async (data) => {
    let temp = [...data];
    delete temp[0].schema;
    delete temp[0].types;
    console.log('temp', temp);
    return temp;
};
exports.filterSchemaTypes = filterSchemaTypes;
//# sourceMappingURL=constants.js.map
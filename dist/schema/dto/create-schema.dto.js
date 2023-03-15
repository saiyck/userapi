"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeSchema = exports.createScheme = exports.dto = exports.DeleteSchemaDto = exports.CreateSchemaDto = void 0;
class CreateSchemaDto {
}
exports.CreateSchemaDto = CreateSchemaDto;
class DeleteSchemaDto {
}
exports.DeleteSchemaDto = DeleteSchemaDto;
class dto {
}
exports.dto = dto;
const createScheme = (data) => {
    let obj = {};
    let arr = Object.entries(data);
    arr.forEach((val) => {
        obj[val[0]] = eval(val[1]);
    });
    return obj;
};
exports.createScheme = createScheme;
const getTypeSchema = (data) => {
    let obj = {};
    let arr = Object.entries(data);
    arr.forEach((val) => {
        obj[val[0]] = typeof val[1];
    });
    return obj;
};
exports.getTypeSchema = getTypeSchema;
//# sourceMappingURL=create-schema.dto.js.map
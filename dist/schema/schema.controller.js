"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaController = void 0;
const common_1 = require("@nestjs/common");
const schema_service_1 = require("./schema.service");
const create_schema_dto_1 = require("./dto/create-schema.dto");
const update_schema_dto_1 = require("./dto/update-schema.dto");
let SchemaController = class SchemaController {
    constructor(schemaService) {
        this.schemaService = schemaService;
    }
    create(createSchemaDto, res) {
        console.log('createSchemaDto', createSchemaDto);
        this.schemaService.create(createSchemaDto, res);
    }
    postData(createSchemaDto, res) {
        this.schemaService.createData(createSchemaDto, res);
    }
    async findAll() {
        return await this.schemaService.findAll();
    }
    findFields(name) {
        console.log('calling fields');
        return this.schemaService.findFields(name);
    }
    findAllData(name) {
        console.log('calling');
        return this.schemaService.findAllData(name);
    }
    findOne(id) {
        console.log('findOne');
        return this.schemaService.findOne(id);
    }
    update(schema, updateSchemaDto) {
        console.log('calling update');
        return this.schemaService.update(schema, updateSchemaDto);
    }
    deleteSchemaFields(schema, deleteSvhemaDto) {
        return this.schemaService.deleteSchemaFields(schema, deleteSvhemaDto);
    }
    getAllCollections(res) {
        this.schemaService.getAllCollectionFields(res);
    }
    remove(schema) {
        return this.schemaService.remove(schema);
    }
    deleteDocument(id, schema) {
        return this.schemaService.deleteDocument(id, schema);
    }
    updateCollectionData(id, schema, updateSchema) {
        console.log('request', id, schema, updateSchema);
        return this.schemaService.updateCollectionData(id, schema, updateSchema);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SchemaController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SchemaController.prototype, "postData", null);
__decorate([
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchemaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchemaController.prototype, "findFields", null);
__decorate([
    (0, common_1.Get)('getAll/data'),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchemaController.prototype, "findAllData", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchemaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('update/data'),
    __param(0, (0, common_1.Query)('schema')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_schema_dto_1.UpdateSchemaDto]),
    __metadata("design:returntype", void 0)
], SchemaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/fields'),
    __param(0, (0, common_1.Query)('schema')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_schema_dto_1.DeleteSchemaDto]),
    __metadata("design:returntype", void 0)
], SchemaController.prototype, "deleteSchemaFields", null);
__decorate([
    (0, common_1.Get)('getAllCollections/all'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SchemaController.prototype, "getAllCollections", null);
__decorate([
    (0, common_1.Delete)(':schema'),
    __param(0, (0, common_1.Param)('schema')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchemaController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('schema')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SchemaController.prototype, "deleteDocument", null);
__decorate([
    (0, common_1.Patch)('update/data/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('schema')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], SchemaController.prototype, "updateCollectionData", null);
SchemaController = __decorate([
    (0, common_1.Controller)('schema'),
    __metadata("design:paramtypes", [schema_service_1.SchemaService])
], SchemaController);
exports.SchemaController = SchemaController;
//# sourceMappingURL=schema.controller.js.map
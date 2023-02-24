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
exports.RelationController = void 0;
const common_1 = require("@nestjs/common");
const relation_service_1 = require("./relation.service");
const create_relation_dto_1 = require("./dto/create-relation.dto");
const update_relation_dto_1 = require("./dto/update-relation.dto");
let RelationController = class RelationController {
    constructor(relationService) {
        this.relationService = relationService;
    }
    create(createRelationDto) {
        console.log('calling relation');
        return this.relationService.create(createRelationDto);
    }
    createRelation(id, createRelationDto) {
        return this.relationService.createRelation(id, createRelationDto);
    }
    findAll(name) {
        return this.relationService.findAll(name);
    }
    findOne(id) {
        return this.relationService.findOne(+id);
    }
    update(id, updateRelationDto) {
        return this.relationService.update(+id, updateRelationDto);
    }
    remove(name) {
        return this.relationService.remove(name);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_relation_dto_1.CreateRelationDto]),
    __metadata("design:returntype", void 0)
], RelationController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_relation_dto_1.CreateRelationDto]),
    __metadata("design:returntype", void 0)
], RelationController.prototype, "createRelation", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RelationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RelationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_relation_dto_1.UpdateRelationDto]),
    __metadata("design:returntype", void 0)
], RelationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RelationController.prototype, "remove", null);
RelationController = __decorate([
    (0, common_1.Controller)('relation'),
    __metadata("design:paramtypes", [relation_service_1.RelationService])
], RelationController);
exports.RelationController = RelationController;
//# sourceMappingURL=relation.controller.js.map
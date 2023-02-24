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
exports.RelationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const addreses_1 = require("./entities/addreses");
const mongodb_1 = require("mongodb");
const constants_1 = require("../schema/common/constants");
let RelationService = class RelationService {
    constructor(connection) {
        this.connection = connection;
    }
    async create(createRelationDto) {
        const { schema, relationName, schemeName, data } = createRelationDto;
        let s = Object.assign(Object.assign({}, schema), { [relationName]: [
                { type: mongoose_2.default.Schema.Types.ObjectId, ref: relationName }
            ] });
        console.log('userschema', s);
        let useschema = new mongoose_2.Schema(s, { timestamps: true });
        console.log('userschema', useschema);
        const userModal = this.connection.model(schemeName, useschema);
        const user = await userModal.create(data);
        return user;
    }
    async createRelation(id, createRelationDto) {
        const { schema, relationName, schemeName, data } = createRelationDto;
        let s = Object.assign(Object.assign({}, schema), { [relationName]: { type: mongoose_2.default.Schema.Types.ObjectId, ref: relationName } });
        var rel;
        try {
            let relSchema = new mongoose_2.Schema(s);
            const relModal = this.connection.model(schemeName, relSchema);
            let resp = await relModal.create(Object.assign(Object.assign({}, data), { [relationName]: id }));
            await resp.save();
            rel = await this.connection.collection(schemeName).findOne({ _id: resp._id });
        }
        catch (error) {
            let resp = await this.connection.collection(schemeName).insertOne(Object.assign(Object.assign({}, data), { [relationName]: id }));
            rel = await this.connection.collection(schemeName).findOne({ _id: resp.insertedId });
        }
        console.log('relsss', rel);
        const user = await this.connection.collection(relationName).findOne();
        let scheaa = (0, constants_1.convertDATAtOsCHEMA)(user);
        var userById = await this.connection.collection(relationName).findOne({ _id: new mongodb_1.ObjectId(id) });
        userById[schemeName].push(rel);
        await this.connection.collection(relationName).updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: userById });
        return { status: 200, data: 'created successfully' };
    }
    async findAll(name) {
        const userModal = await this.connection.collection(name).findOne();
        console.log('userModal', userModal);
        let scheaa = (0, constants_1.convertDATAtOsCHEMA)(userModal);
        var modal;
        try {
            modal = await this.connection.model(name);
            console.log('calling withought schema');
        }
        catch (error) {
            modal = await this.connection.model(name, scheaa);
            console.log('calling with schema');
        }
        let data = await modal.find();
        console.log('data', data);
        return data;
    }
    findOne(id) {
        return `This action returns a #${id} relation`;
    }
    update(id, updateRelationDto) {
        let addressSchema = new mongoose_2.Schema(addreses_1.address, { timestamps: true });
        let addressModal;
        try {
            addressModal = this.connection.model('Addres', addressSchema);
        }
        catch (error) {
            addressModal = this.connection.model('Addres');
        }
        return `This action updates a #${id} relation`;
    }
    remove(name) {
        return this.connection.collection(name).drop();
    }
};
RelationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Connection])
], RelationService);
exports.RelationService = RelationService;
//# sourceMappingURL=relation.service.js.map
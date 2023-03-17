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
exports.SchemaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
const constants_1 = require("./common/constants");
let SchemaService = class SchemaService {
    constructor(connection) {
        this.connection = connection;
    }
    async create(createSchemaDto, res) {
        const { schemaName, fields } = createSchemaDto;
        let data = await this.connection.db.collection(schemaName).findOne();
        console.log('datataa', data);
        if (!data) {
            try {
                let result = (0, constants_1.createUserSchema)(fields);
                console.log('result', result);
                const blogSchema = new mongoose_3.Schema(result.schema, { timestamps: true, strict: false });
                const blogModal = this.connection.model(schemaName, blogSchema);
                const doc = new blogModal(result.data);
                await doc.save();
                res.send({
                    status: 201,
                    message: "schema create successfully",
                    result
                });
            }
            catch (error) {
                console.log('error', error);
                res.send({
                    status: 400,
                    message: error
                });
            }
        }
        else {
            res.send({
                status: 400,
                message: "Schema Already exists"
            });
        }
    }
    async findFields(name) {
        try {
            let data = await this.connection.db.collection(name).findOne();
            let schema = data.schema;
            let fields = (0, constants_1.convertFieldsData)(schema, data);
            const output = {
                status: 200,
                schemeName: name,
                fields
            };
            return output;
        }
        catch (error) {
            return {
                status: 400,
                message: 'Error'
            };
        }
    }
    printSchema(obj) {
        let objs = {};
        for (var key in obj) {
            if (key != "_id") {
                objs[key] = typeof obj[key];
            }
        }
        console.log(objs);
        return objs;
    }
    ;
    async createData(createSchemaDto, res) {
        console.log('createSchemaDto.data', createSchemaDto.data);
        let data = Object.assign(Object.assign({}, createSchemaDto.data), { createdAt: new Date(), updatedAt: new Date() });
        console.log('data', data);
        try {
            let result = await this.connection.db.collection(createSchemaDto.name).insertOne(data);
            res.send({
                status: 201,
                message: "data create successfully"
            });
        }
        catch (error) {
            res.send({
                status: 400,
                message: "data not created",
                error: error
            });
        }
    }
    async findAll() {
        let resp = await this.connection.db.listCollections().toArray();
        let response = resp.map((val, ind) => { return { value: ind + 1, name: val.name }; });
        return response;
    }
    findOne(schemas) {
        let result = this.connection.model('Hello14').schema;
        console.log('result', result.obj);
        return result.obj;
    }
    async update(schema, updateSchemaDto) {
        console.log('schema', schema, 'data', updateSchemaDto);
        let result = await this.connection.db.collection(schema).updateMany({}, { $rename: updateSchemaDto });
        let data = await this.connection.db.collection(schema).findOne();
        const types = data.types;
        const schemad = data.schema;
        let final = (0, constants_1.updateTypes)(types, updateSchemaDto);
        let finalSchema = (0, constants_1.updateTypes)(schemad, updateSchemaDto);
        console.log('final schema', finalSchema);
        await this.connection.db.collection(schema).updateOne({ _id: data._id }, { $set: { types: final, schema: finalSchema } });
        return {
            status: 201,
            message: 'schema has been updated'
        };
    }
    async deleteSchemaFields(schema, deleteSchema) {
        console.log('schema', schema, 'data', deleteSchema);
        let result = await this.connection.db.collection(schema).updateMany({}, { $unset: deleteSchema });
        let data = await this.connection.db.collection(schema).findOne();
        const types = data.types;
        const schemad = data.schema;
        let final = (0, constants_1.deleteTypesSchemas)(types, deleteSchema);
        let finalSchema = (0, constants_1.deleteTypesSchemas)(schemad, deleteSchema);
        console.log('final schema', final);
        await this.connection.db.collection(schema).updateOne({ _id: data._id }, { $set: { types: final, schema: finalSchema } });
        return {
            status: 201,
            message: 'schema has been updated'
        };
    }
    async findAllData(name) {
        let response = [];
        let result = await this.connection.db.collection(name).findOne();
        if (result) {
            try {
                let datss = await this.connection.model(name);
                response = await datss.find({}, { createdAt: 0, updatedAt: 0, __v: 0 });
            }
            catch (error) {
                let datss = await this.connection.model(name, result.schema);
                response = await datss.find({}, { createdAt: 0, updatedAt: 0, __v: 0 });
            }
        }
        let res = {
            schemaName: name,
            data: response
        };
        return res;
    }
    async remove(schema) {
        console.log('schema', schema);
        try {
            let result = await this.connection.db.collection(schema).drop();
            console.log('result', result);
            return {
                status: 200,
                message: schema + ' collection deleted successfully'
            };
        }
        catch (error) {
            return {
                status: 400,
                message: schema + ' collection not deleted'
            };
        }
    }
    async getAllCollectionFields(res) {
        let response = [];
        let allList = await this.findAll();
        if (allList.length === 0) {
            res.send([]);
        }
        for (let i = 0; i < allList.length; i++) {
            const data = await this.findAllData(allList[i].name);
            response.push(data);
            if (response.length == allList.length) {
                res.send(response);
            }
        }
    }
    async deleteDocument(id, schema) {
        let response;
        let result = await this.connection.db.collection(schema).findOne();
        try {
            let datss = await this.connection.model(schema);
            response = await datss.deleteOne({ _id: id });
        }
        catch (error) {
            let datss = await this.connection.model(schema, result.schema);
            response = await datss.deleteOne({ _id: id });
        }
        console.log('ress', response);
        return {
            status: 204,
            message: "delete success fully"
        };
    }
    async updateCollectionData(id, schema, data) {
        let response;
        let result = await this.connection.db.collection(schema).findOne();
        try {
            let datss = await this.connection.model(schema);
            console.log('datss', datss);
            response = await datss.updateMany({ _id: id }, { $set: data });
            console.log('resstry', response);
        }
        catch (error) {
            let datss = await this.connection.model(schema, result.schema);
            console.log('datss', datss);
            response = await datss.updateMany({ _id: id }, { $set: data });
            console.log('resscatch', response);
        }
        console.log('resss', response);
        if (response.acknowledged && response.matchedCount > 0) {
            return {
                status: 204,
                message: "collection data updated"
            };
        }
        else if (response.matchedCount == 0) {
            return {
                status: 400,
                message: "no data found with respect ID"
            };
        }
        else {
            return {
                status: 400,
                message: "Bad Request"
            };
        }
    }
};
SchemaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Connection])
], SchemaService);
exports.SchemaService = SchemaService;
//# sourceMappingURL=schema.service.js.map
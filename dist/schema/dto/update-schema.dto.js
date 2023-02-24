"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSchemaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_schema_dto_1 = require("./create-schema.dto");
class UpdateSchemaDto extends (0, mapped_types_1.PartialType)(create_schema_dto_1.CreateSchemaDto) {
}
exports.UpdateSchemaDto = UpdateSchemaDto;
//# sourceMappingURL=update-schema.dto.js.map
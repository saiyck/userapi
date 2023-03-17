"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const ResponseAddHeaders_1 = require("./ResponseAddHeaders");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalInterceptors(new ResponseAddHeaders_1.ResponseAddHeaders);
    await app.listen(process.env.PORT || 3001);
}
bootstrap();
//# sourceMappingURL=main.js.map
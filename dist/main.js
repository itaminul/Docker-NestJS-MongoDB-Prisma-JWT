"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const APP_PORT = process.env.APP_PORT || 9007;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(APP_PORT, () => {
        console.log(`Server is listening on port ${APP_PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map
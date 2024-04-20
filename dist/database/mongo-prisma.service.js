"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MongoPrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoPrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let MongoPrismaService = MongoPrismaService_1 = class MongoPrismaService extends client_1.PrismaClient {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(MongoPrismaService_1.name);
    }
    async onModuleInit() {
        let retries = 5;
        while (retries > 0) {
            try {
                await this.$connect();
                this.logger.log('Successfully connected to mongo database');
                break;
            }
            catch (err) {
                this.logger.error(err);
                this.logger.error(`there was an error connecting to database, retrying .... (${retries})`);
                retries -= 1;
                await new Promise((res) => setTimeout(res, 3_000));
            }
        }
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
};
exports.MongoPrismaService = MongoPrismaService;
exports.MongoPrismaService = MongoPrismaService = MongoPrismaService_1 = __decorate([
    (0, common_1.Injectable)()
], MongoPrismaService);
//# sourceMappingURL=mongo-prisma.service.js.map
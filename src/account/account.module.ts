import { Module } from "@nestjs/common";

import { DatabaseModule } from "src/database/database.module";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { PrismaService } from "src/database/mongo-prisma.service";

@Module({
  controllers: [AccountController],
  providers: [AccountService, PrismaService],
  exports: [AccountService],
  imports: [DatabaseModule],
})
export class AccountModule {}

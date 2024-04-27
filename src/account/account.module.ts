import { Module } from "@nestjs/common";

import { DatabaseModule } from "src/database/database.module";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
  imports: [DatabaseModule],
})
export class AccountModule {}

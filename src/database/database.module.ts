import { Module } from "@nestjs/common";
import { PrismaService } from "./mongo-prisma.service";

@Module({
  providers: [PrismaService],
})
export class DatabaseModule {}

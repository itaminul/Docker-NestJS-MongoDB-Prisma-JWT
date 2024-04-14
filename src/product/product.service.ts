import { Injectable } from "@nestjs/common";
import { MongoPrismaService } from "src/database/mongo-prisma.service";
import { PostgresPrismaService } from "src/database/postgres.prisma.service";

@Injectable()
export class ProductService {
  constructor(
    private readonly postgreService: PostgresPrismaService,
    private readonly mongodbService: MongoPrismaService
  ) {}

  async getAll() {
    return await this.postgreService.invItemSetup.findMany();
  }
}

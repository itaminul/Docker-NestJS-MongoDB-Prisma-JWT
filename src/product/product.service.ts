import { Cache } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { MongoPrismaService } from "src/database/mongo-prisma.service";
import { PostgresPrismaService } from "src/database/postgres.prisma.service";

@Injectable()
export class ProductService {
  constructor(
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
    private readonly postgreService: PostgresPrismaService,
    private readonly mongodbService: MongoPrismaService
  ) {}

  
  async getAll() {
    let items = await this.postgreService.invItemSetup.findMany();
    if(items && items.length > 0) {
      await this.cacheManager.set('items', items);
      return await this.cacheManager.get('itmes');
    } else {
      throw new Error('No items found or items are undefined');
    }
  }
}

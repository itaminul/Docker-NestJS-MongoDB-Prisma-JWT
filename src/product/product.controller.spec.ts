import { Test, TestingModule } from "@nestjs/testing";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { MongoPrismaService } from "../database/mongo-prisma.service";
import { PostgresPrismaService } from "../database/postgres.prisma.service";
const MockPrismaService = {};
describe("ProductController", () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        { provide: MongoPrismaService, useValue: MockPrismaService },
        { provide: PostgresPrismaService, useValue: MockPrismaService },
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

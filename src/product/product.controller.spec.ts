import { Test, TestingModule } from "@nestjs/testing";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { PrismaService } from "../database/mongo-prisma.service";
const MockPrismaService = {};
describe("ProductController", () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        { provide: PrismaService, useValue: MockPrismaService },
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });
  
  it("create", () => {

  })

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from "@nestjs/testing";
import { ProductService } from "./product.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { PrismaService } from "../database/mongo-prisma.service";
const MockPrismaService = {};
describe("ProductService", () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: PrismaService, useValue: MockPrismaService },
        {
          provide: CACHE_MANAGER,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});

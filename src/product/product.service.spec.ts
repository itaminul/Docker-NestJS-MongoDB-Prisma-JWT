import { Test, TestingModule } from "@nestjs/testing";
import { ProductService } from "./product.service";
import { MongoPrismaService } from "../database/mongo-prisma.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { PostgresPrismaService } from "../database/postgres.prisma.service";
const MockPrismaService = {};
describe("ProductService", () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: MongoPrismaService, useValue: MockPrismaService },
        { provide: PostgresPrismaService, useValue: MockPrismaService },
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

import { Test, TestingModule } from "@nestjs/testing";
import { ProductService } from "./product.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { PrismaService } from "../database/mongo-prisma.service";
import { CreateProductDto } from "./dto/create.product.dto";

const MockPrismaService = {
  invItemSetup: {
    create: jest.fn(), // Mock the create method
  },
};

describe("ProductService", () => {
  let service: ProductService;
  let prismaService: PrismaService;

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
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it("create", async () => {
    const createProductDto = new CreateProductDto();
    const expectedResult = {
      ...createProductDto,
    };

    jest
      .spyOn(MockPrismaService.invItemSetup, "create")
      .mockReturnValue(expectedResult);
    const result = await service.create(createProductDto);
    expect(result).toEqual(expectedResult);
    expect(MockPrismaService.invItemSetup.create).toHaveBeenCalledWith({
      data: expect.objectContaining(expectedResult),
    });
  });
});

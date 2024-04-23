import { Test, TestingModule } from "@nestjs/testing";
import { ProductService } from "./product.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { PrismaService } from "../database/mongo-prisma.service";
import { CreateProductDto } from "./dto/create.product.dto";
import { UpdateProductDto } from "./dto/update.product.dto";

const MockPrismaService = {
  invItemSetup: {
    create: jest.fn(), // Mock the create method
    update: jest.fn(),
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
  it("update", async () => {
    const updateProductDto = new UpdateProductDto();
    const productId = "1";
    const expectedResult = {
      id: productId,
      ...updateProductDto,
    };
    jest
      .spyOn(MockPrismaService.invItemSetup, "update")
      .mockReturnValue(expectedResult);
    const result = await service.update(productId, updateProductDto);
    expect(result).toEqual(expectedResult);
    expect(MockPrismaService.invItemSetup.update).toHaveBeenCalledWith({
      where: { id: productId }, 
      data: expect.objectContaining(updateProductDto),
    });
  });
});

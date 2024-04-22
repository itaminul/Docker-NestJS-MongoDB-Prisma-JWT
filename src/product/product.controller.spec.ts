import { Test, TestingModule } from "@nestjs/testing";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { PrismaService } from "../database/mongo-prisma.service";
import { CreateProductDto } from "./dto/create.product.dto";
import { HttpStatus } from "@nestjs/common";
const MockPrismaService = {};
describe("ProductController", () => {
  let controller: ProductController;
  let service: ProductService;

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
    service = module.get<ProductService>(ProductService);
  });

  it("create", async () => {
    const createProductDto = new CreateProductDto();
    const createProduct = {
      ...createProductDto,
    };
    jest.spyOn(service, "create").mockResolvedValue(createProduct as any);
    const result = await controller.create(createProductDto);
    // Expectations
    expect(result).toEqual({
      success: true,
      status: HttpStatus.OK,
      results: createProduct,
    });
    expect(service.create).toHaveBeenCalledWith(createProductDto);
  });
  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

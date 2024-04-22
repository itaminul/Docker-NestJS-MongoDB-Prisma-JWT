import { Cache } from "@nestjs/cache-manager";
import { Body, Inject, Injectable, Param } from "@nestjs/common";
import { CreateProductDto } from "./dto/create.product.dto";
import { PrismaService } from "../database/mongo-prisma.service";
import { UpdateProductDto } from "./dto/update.product.dto";

@Injectable()
export class ProductService {
  constructor(
    @Inject("CACHE_MANAGER") private cacheManager: Cache,
    private readonly prismaService: PrismaService
  ) {}

  async getAll() {
    let items = await this.prismaService.invItemSetup.findMany();
    if (items && items.length > 0) {
      await this.cacheManager.set("items", items);
      return await this.cacheManager.get("itmes");
    } else {
      throw new Error("No items found or items are undefined");
    }
  }

  async create(@Body() dto: CreateProductDto) {
    const {
      itemName,
      itemCode,
      itemDescription,
      itemGroupId,
      itemImage,
      orgId,
      salePrice,
      supplierId,
      costPrice,
      expireDate,
      manufactureDate,
      measurementtId,
      modelNo,
      taxRate,
      reorderLabel,
      remarks,
    } = dto;
    let result = await this.prismaService.invItemSetup.create({
      data: {
        itemName,
        itemCode,
        itemDescription,
        itemGroupId,
        itemImage,
        orgId,
        salePrice,
        supplierId,
        costPrice,
        expireDate,
        manufactureDate,
        measurementtId,
        modelNo,
        taxRate,
        reorderLabel,
        remarks,
      },
    });
    return result;
  }

  async update(@Param("id") id: string, @Body() dto: UpdateProductDto) {
    const {
      itemName,
      itemCode,
      itemDescription,
      itemGroupId,
      itemImage,
      orgId,
      salePrice,
      supplierId,
      costPrice,
      expireDate,
      manufactureDate,
      measurementtId,
      modelNo,
      taxRate,
      reorderLabel,
      remarks,
      activeStatus,
    } = dto;
    let result = await this.prismaService.invItemSetup.update({
      where: {
        id: id,
      },
      data: {
        itemName,
        itemCode,
        itemDescription,
        itemGroupId,
        itemImage,
        orgId,
        salePrice,
        supplierId,
        costPrice,
        expireDate,
        manufactureDate,
        measurementtId,
        modelNo,
        taxRate,
        reorderLabel,
        remarks,
        activeStatus,
      },
    });
    return result;
  }
}

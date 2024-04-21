import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create.product.dto";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll() {
    try {
      const results = await this.productService.getAll();
      return {
        message: "Show Successfully",
        success: true,
        status: HttpStatus.OK,
        results,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  @Post()
  async create(@Body() dto: CreateProductDto) {
    try {
      const results = await this.productService.create(dto);
      return {
        success: true,
        status: HttpStatus.OK,
        results,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

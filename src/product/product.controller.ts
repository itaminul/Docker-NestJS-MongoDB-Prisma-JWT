import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';

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
}

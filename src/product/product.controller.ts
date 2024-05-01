import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create.product.dto";
import { UpdateProductDto } from "./dto/update.product.dto";
import { EmailService } from "src/service/EmailService";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService, private readonly emailService: EmailService) {}

  @Get()
  async getAll() {
    try {
      let to = "aminul@atilimited.net";
      let subject = "For test";
      let text = "Tesging email";
      const mail = await this.emailService.sendEmail(to, subject, text);
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
  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateProductDto) {
    try {
      const results = await this.productService.update(id, dto);
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

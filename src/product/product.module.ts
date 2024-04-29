import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from '../database/mongo-prisma.service';
import { EmailService } from 'src/service/EmailService';
;

@Module({
  providers: [PrismaService, ProductService, EmailService],
  controllers: [ProductController],
})
export class ProductModule {}

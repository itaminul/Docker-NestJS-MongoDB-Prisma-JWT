import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PostgresPrismaService } from 'src/database/postgres.prisma.service';
import { MongoPrismaService } from 'src/database/mongo-prisma.service';

@Module({
  providers: [PostgresPrismaService, MongoPrismaService, ProductService],
  controllers: [ProductController],
})
export class ProductModule {}

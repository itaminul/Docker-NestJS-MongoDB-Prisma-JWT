import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductModule } from "./product/product.module";
import { DatabaseModule } from "./database/database.module";
import { ProductController } from "./product/product.controller";
import { ProductService } from "./product/product.service";
import { PostgresPrismaService } from "./database/postgres.prisma.service";
import { MongoPrismaService } from "./database/mongo-prisma.service";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-yet";
@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: "localhost",
            port: 6379,
          },
        }),
      }),
    }),
    DatabaseModule,
    ProductModule,
  ],
  controllers: [AppController, ProductController],
  providers: [
    AppService,
    ProductService,
    PostgresPrismaService,
    MongoPrismaService,
  ],
})
export class AppModule {}

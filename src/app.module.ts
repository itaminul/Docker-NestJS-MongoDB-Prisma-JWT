import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductModule } from "./product/product.module";
import { DatabaseModule } from "./database/database.module";
import { ProductController } from "./product/product.controller";
import { ProductService } from "./product/product.service";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-yet";
import { PrismaService } from "src/database/mongo-prisma.service";
import { ConfigModule } from "@nestjs/config";
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
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    ProductModule,
  ],
  controllers: [AppController, ProductController],
  providers: [
    AppService,
    ProductService,
    PrismaService,
  ],
})
export class AppModule {}

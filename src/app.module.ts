import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ProductModule } from "./product/product.module";
import { DatabaseModule } from "./database/database.module";
import { ProductController } from "./product/product.controller";
import { ProductService } from "./product/product.service";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-yet";
import { PrismaService } from "src/database/mongo-prisma.service";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { LoggerMiddleware } from "./common/utils/logger";
import { AccountModule } from "./account/account.module";
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
      isGlobal: true,
    }),
    DatabaseModule,
    ProductModule,
    AuthModule,
    AccountModule
  ],
  controllers: [ProductController, AuthController],
  providers: [PrismaService, ProductService, AuthService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

//https://dev.to/algodame/implementing-sms-enabled-two-factor-authentication-using-nestjs-twilio-and-prisma-52p

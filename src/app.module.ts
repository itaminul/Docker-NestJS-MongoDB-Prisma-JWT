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
import { ScheduleModule } from "@nestjs/schedule";
import { TasksService } from "./service/TaskService";
import { NotificationService } from "./service/NotificationService";
import { EmailService } from "./service/EmailService";
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
    ScheduleModule.forRoot(),
    DatabaseModule,
    ProductModule,
    AuthModule,
    AccountModule,
  ],
  controllers: [ProductController, AuthController],
  providers: [
    PrismaService,
    ProductService,
    AuthService,
    JwtService,
    TasksService,
    NotificationService,
    EmailService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}

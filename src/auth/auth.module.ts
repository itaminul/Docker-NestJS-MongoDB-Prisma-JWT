import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { constants } from 'src/common/utils/constants';
import { DatabaseModule } from 'src/database/database.module';
import { PrismaService } from 'src/database/mongo-prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: constants.jwtSecret,
      signOptions: { expiresIn: '30 days' },
    }),
  ],
})
export class AuthModule {}

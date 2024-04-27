import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/database/mongo-prisma.service';
import { verifyPassword } from '../common/utils/passwordHasher';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const validPassword = await verifyPassword(
      loginDto.password,
      user.password,
    );

    if (!validPassword) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user.twoFA) {
      const payload = {
        email: user.email,
        phoneNumber: user.phoneNumber,
        sub: user.id,
      };
      return {
        success: true,
        access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET }),
      };
    }
  }
}
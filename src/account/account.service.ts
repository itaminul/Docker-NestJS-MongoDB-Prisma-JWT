import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import _ from 'underscore';
import { PrismaService } from 'src/database/mongo-prisma.service';
import { hashPassword } from 'src/common/utils/passwordHasher';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async signUp(createUserDto: CreateUserDto) {
    createUserDto.password = await hashPassword(createUserDto.password);
    const user = await this.prisma.user.create({ data: createUserDto });
    return _.omit(user, 'password');
  }
}
import {
    Controller,
    Post,
    Body,
    UsePipes,
  } from '@nestjs/common';
  import { AccountService } from './account.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { signupSchema } from '../common/joi-schema/signup';
  import { JoiValidationPipe } from '../common/pipes/joi';
  
  @Controller('account')
  export class AccountController {
    constructor(private readonly accountService: AccountService) {}
  
    @Post('signup')
    @UsePipes(new JoiValidationPipe(signupSchema))
    create(@Body() createUserDto: CreateUserDto) {
      return this.accountService.signUp(createUserDto);
    }
  }
import { Injectable } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";

@Injectable()
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

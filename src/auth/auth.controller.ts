import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { JoiValidationPipe } from "../common/pipes/joi";
import { loginSchema } from "src/common/joi-schema/oi-schema/login";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new JoiValidationPipe(loginSchema))
  @HttpCode(200)
  @Post("login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}

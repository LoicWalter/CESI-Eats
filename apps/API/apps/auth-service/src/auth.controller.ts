import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './auth.service';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '@gen/client/users';
import { AuthMessage, CurrentUser } from 'libs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@CurrentUser() user: User, @Res({ passthrough: true }) response: Response) {
    this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern(AuthMessage.VALIDATE_USER)
  validateUser(@CurrentUser() user: User) {
    return user;
  }

  @MessagePattern(AuthMessage.VALIDATE_API_KEY)
  validateApiKey(data: { API_KEY: string }) {
    return this.authService.validateApiKey(data.API_KEY);
  }
}

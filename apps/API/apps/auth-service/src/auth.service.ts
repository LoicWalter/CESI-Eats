import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from '@gen/client/users';
import { Cookies } from 'libs/common';
import { PrismaUsersService } from '@app/databases/users/prisma/prisma-users.service';

export interface TokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prismaUsersService: PrismaUsersService,
  ) {}

  login(user: User, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user.id,
    };

    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + this.configService.get('JWT_EXPIRATION'));

    const token = this.jwtService.sign(tokenPayload);

    response.cookie(Cookies.Authentication, token, {
      httpOnly: true,
      expires,
    });
  }

  async validateApiKey(API_KEY: string) {
    const user = await this.prismaUsersService.user.findUnique({
      where: {
        apiKey: API_KEY,
      },
    });

    return !!user;
  }
}

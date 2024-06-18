import { Injectable, Logger } from '@nestjs/common';
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

  private readonly logger = new Logger(AuthService.name);

  login(user: User, response: Response) {
    this.logger.log(`User ${user.id} logged in`);
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
    this.logger.log(`Validating API key ${API_KEY}`);
    const user = await this.prismaUsersService.user.findUnique({
      where: {
        apiKey: API_KEY,
      },
    });

    return !!user;
  }
}

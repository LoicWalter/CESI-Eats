import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@gen/client/users';
import { PrismaUsersService } from '@app/databases/users/prisma/prisma-users.service';
import { CreateUserMessage, ErrorsMessages } from 'libs/common';
import { Role } from '@gen/client/users';
import { RpcException } from '@nestjs/microservices';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaUsersService) {}

  async createUser(data: CreateUserMessage) {
    const user = await this.getUserByEmail(data.email);
    if (user) {
      return this.addSignupInfosToUser(user, data.role);
    }
    const newUser = await this.prisma.user.create({
      data: {
        email: data.email,
        password: await bcrypt.hash(data.password, 10),
        roles: [data.role],
      },
    });
    return newUser;
  }

  private addSignupInfosToUser(user: User, role: Role) {
    if (user.roles.includes(role)) {
      throw new RpcException(ErrorsMessages.USER_ALREADY_EXISTS);
    }
    return this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        roles: [...user.roles, role],
      },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new UnauthorizedException(ErrorsMessages.INVALID_CREDENTIALS);
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException(ErrorsMessages.INVALID_CREDENTIALS);
    }
    return user;
  }

  getUserById(userId: string) {
    return this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
}

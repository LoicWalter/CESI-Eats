import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@gen/client/users';
import { PrismaUsersService } from '@app/databases/users/prisma/prisma-users.service';
import { CreateUserMessage, EditUserMessage, ErrorsMessages } from 'libs/common';
import { RpcException } from '@nestjs/microservices';
import { Role } from '@gen/client/users';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaUsersService) {}

  async editUser(data: EditUserMessage, role?: Role) {
    if (data.dto.email) {
      const user = await this.getUserByEmail(data.dto.email);
      if (user && user.id !== data.user.id) {
        throw new RpcException(ErrorsMessages.USER_ALREADY_EXISTS);
      }
    }
    if (data.dto.password) {
      data.dto.password = await bcrypt.hash(data.dto.password, 10);
    }

    let newRoles = data.user.roles;
    if (!data.user.roles.includes(role) && role) {
      newRoles = [...data.user.roles, role];
    }

    const user = await this.prisma.user.update({
      where: {
        id: data.user.id,
      },
      data: {
        ...data.dto,
        profilePicture: data.profilePicture,
        roles: newRoles,
      },
    });
    return user;
  }

  async createUser(data: CreateUserMessage) {
    const user = await this.getUserByEmail(data.dto.email);
    if (user) {
      return this.editUser(new EditUserMessage(user, data.dto, data.profilePicture), data.role);
    }
    const newUser = await this.prisma.user.create({
      data: {
        email: data.dto.email,
        password: await bcrypt.hash(data.dto.password, 10),
        profilePicture: data.profilePicture,
      },
    });
    return newUser;
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

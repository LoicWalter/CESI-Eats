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
      if (user && user.id !== data.userId) {
        throw new RpcException(ErrorsMessages.USER_ALREADY_EXISTS);
      }
    }
    if (data.dto.password) {
      data.dto.password = await bcrypt.hash(data.dto.password, 10);
    }

    const editedUser = await this.prisma.user.findFirst({
      where: {
        id: data.userId,
      },
    });

    let newRoles = editedUser?.roles;
    if (!editedUser?.roles.includes(role) && role) {
      newRoles = [...editedUser?.roles, role];
    }

    const user = await this.prisma.user.update({
      where: {
        id: data.userId,
      },
      data: {
        ...data.dto,
        profilePicture: data.profilePicture,
        roles: newRoles,
      },
      include: {
        filleuls: true,
        parrain: true,
      },
    });
    return user;
  }

  async createUser(data: CreateUserMessage) {
    const { password, parrainId, ...rest } = data.dto;
    const user = await this.getUserByEmail(data.dto.email);
    if (user) {
      if (user.roles.includes(data.role)) {
        throw new RpcException(ErrorsMessages.USER_ALREADY_EXISTS);
      }
      return this.editUser(new EditUserMessage(user.id, data.dto, data.profilePicture), data.role);
    }

    const newUser = await this.prisma.user.create({
      data: {
        password: await bcrypt.hash(password, 10),
        ...rest,
        profilePicture: data.profilePicture,
        roles: [data.role],
      },
    });

    if (parrainId) {
      const newUserWithParrain = await this.prisma.user.update({
        where: {
          id: newUser.id,
        },
        data: {
          parrainId,
        },
        include: {
          filleuls: true,
          parrain: true,
        },
      });
      return newUserWithParrain;
    }

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

    if (user.suspended) {
      throw new UnauthorizedException(ErrorsMessages.USER_SUSPENDED);
    }

    return user;
  }

  getUserById(userId: string) {
    return this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        filleuls: true,
        parrain: true,
      },
    });
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        filleuls: true,
        parrain: true,
      },
    });
  }

  async getUsers() {
    const users = await this.prisma.user.findMany({
      include: {
        filleuls: true,
        parrain: true,
      },
    });

    return users.reduce((acc, user) => {
      delete user.password;
      acc.push(user);
      return acc;
    }, []);
  }

  deleteUser(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

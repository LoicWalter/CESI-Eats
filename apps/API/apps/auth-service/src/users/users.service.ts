import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@gen/client/users';
import { PrismaUsersService } from '@app/databases/users/prisma/prisma-users.service';
import { CreateUserMessage, EditUserMessage, ErrorsMessages } from 'libs/common';
import { RpcException } from '@nestjs/microservices';
import { Role } from '@gen/client/users';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaUsersService) {}

  private readonly logger = new Logger(UsersService.name);

  async editUser(data: EditUserMessage, role?: Role) {
    this.logger.log(`Editing user ${data.userId}`);
    if (data.dto.email) {
      const user = await this.getUserByEmail(data.dto.email);
      if (user && user.id !== data.userId) {
        this.logger.error(`User ${data.userId} already exists`);
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
    this.logger.log(`User ${data.userId} edited`);
    return user;
  }

  async createUser(data: CreateUserMessage) {
    this.logger.log(`Creating user ${data.dto.email}`);
    const { password, parrainId, ...rest } = data.dto;
    const user = await this.getUserByEmail(data.dto.email);
    if (user) {
      if (user.roles.includes(data.role)) {
        this.logger.error(`User ${data.dto.email} already exists`);
        throw new RpcException(ErrorsMessages.USER_ALREADY_EXISTS);
      }
      this.logger.log(`User ${data.dto.email} already exists, adding role`);
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
      this.logger.log(`User ${data.dto.email} created with parrain`);
      return newUserWithParrain;
    }
    this.logger.log(`User ${data.dto.email} created`);
    return newUser;
  }

  async validateUser(email: string, password: string) {
    this.logger.log(`Validating user ${email}`);
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) {
      this.logger.error(`User ${email} not found`);
      throw new UnauthorizedException(ErrorsMessages.INVALID_CREDENTIALS);
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      this.logger.error(`User ${email} password is invalid`);
      throw new UnauthorizedException(ErrorsMessages.INVALID_CREDENTIALS);
    }

    if (user.suspended) {
      this.logger.error(`User ${email} is suspended`);
      throw new UnauthorizedException(ErrorsMessages.USER_SUSPENDED);
    }

    this.logger.log(`User ${email} validated`);
    return user;
  }

  getUserById(userId: string) {
    this.logger.log(`Getting user ${userId}`);
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
    this.logger.log(`Getting user ${email}`);
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
    this.logger.log(`Getting all users`);
    const users = await this.prisma.user.findMany({
      include: {
        filleuls: true,
        parrain: true,
      },
    });

    this.logger.log(`All users fetched`);
    return users.reduce((acc, user) => {
      delete user.password;
      acc.push(user);
      return acc;
    }, []);
  }

  deleteUser(id: string) {
    this.logger.log(`Deleting user ${id}`);
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

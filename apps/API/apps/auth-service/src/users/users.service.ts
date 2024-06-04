import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User, Role } from '@gen/client/users';
import { PrismaUsersService } from '@app/databases/users/prisma/prisma-users.service';
import { CreateClientMessage } from 'libs/common';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaUsersService) {}

  async createUser(data: CreateClientMessage) {
    const isRequestValid = await this.isCreateUserRequestValid(data);
    if (!isRequestValid) {
      return new UnprocessableEntityException('User already exists.');
    }
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: await bcrypt.hash(data.password, 10),
        roles: [Role.CLIENT],
      },
    });
    return user;
  }

  private async isCreateUserRequestValid(dto: CreateUserDto) {
    let user: User;
    try {
      user = await this.prisma.user.findFirst({
        where: {
          email: dto.email,
        },
      });
    } catch (err) {}

    if (user) {
      return false;
    }
    return true;
  }

  async validateUser(email: string, password: string) {
    console.log('email', email);
    console.log('password', password);
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  async getUser(getUserArgs: Partial<User>) {
    return this.prisma.user.findFirst({
      where: this.removeRoles(getUserArgs),
    });
  }

  private removeRoles(user: Partial<User>): Partial<Omit<User, 'roles'>> {
    const userWithoutRoles = { ...user };
    delete userWithoutRoles.roles;
    return userWithoutRoles;
  }
}

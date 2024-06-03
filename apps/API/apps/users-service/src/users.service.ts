import { Injectable } from '@nestjs/common';
import { PrismaUsersService } from '@app/databases/users/prisma/prisma-users.service';
import { CreateUserEvent } from '@app/common/events';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaUsersService) {}

  createUser(data: CreateUserEvent) {
    console.log('Creating user :', data);
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
      },
    });
  }
}

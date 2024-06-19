import { Module } from '@nestjs/common';
import { PrismaUsersService } from './prisma-users.service';

@Module({
  providers: [PrismaUsersService],
  exports: [PrismaUsersService],
})
export class PrismaUsersModule {}

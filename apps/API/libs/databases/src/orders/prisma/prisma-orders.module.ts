import { Module } from '@nestjs/common';
import { PrismaOrdersService } from './prisma-orders.service';

@Module({
  providers: [PrismaOrdersService],
  exports: [PrismaOrdersService],
})
export class PrismaOrdersModule {}

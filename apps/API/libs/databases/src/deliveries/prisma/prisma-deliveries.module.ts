import { Module } from '@nestjs/common';
import { PrismaDeliveriesService } from './prisma-deliveries.service';

@Module({
  providers: [PrismaDeliveriesService],
  exports: [PrismaDeliveriesService],
})
export class PrismaDeliveriesModule {}

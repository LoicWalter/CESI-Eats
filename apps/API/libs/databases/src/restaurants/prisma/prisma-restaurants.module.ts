import { Module } from '@nestjs/common';
import { PrismaRestaurantsService } from './prisma-restaurants.service';

@Module({
  providers: [PrismaRestaurantsService],
  exports: [PrismaRestaurantsService],
})
export class PrismaRestaurantsModule {}

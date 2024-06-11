import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@gen/client/restaurants';

@Injectable()
export class PrismaRestaurantsService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get<string>('DATABASE_URL_RESTAURANTS'),
        },
      },
    });
  }
}

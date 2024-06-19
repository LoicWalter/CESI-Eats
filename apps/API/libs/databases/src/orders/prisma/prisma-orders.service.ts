import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@gen/client/orders';

@Injectable()
export class PrismaOrdersService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get<string>('DATABASE_URL_ORDERS'),
        },
      },
    });
  }
}

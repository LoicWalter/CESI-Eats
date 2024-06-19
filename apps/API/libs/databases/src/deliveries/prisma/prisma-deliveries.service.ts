import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@gen/client/deliveries';

@Injectable()
export class PrismaDeliveriesService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get<string>('DATABASE_URL_DELIVERIES'),
        },
      },
    });
  }
}

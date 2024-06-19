import { Controller, UseFilters } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { MessagePattern } from '@nestjs/microservices';
import { UnprocessableEntityExceptionFilter } from 'apps/api-gateway/src/filter/rpc-422-exception.filter';
import { GetRestaurantOrdersStatsMessage, StatisticsMessage } from 'libs/common';

@Controller()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(StatisticsMessage.GET_ORDERS_STATS)
  handleOrdersStatsGot() {
    return this.statisticsService.getOrdersStats();
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(StatisticsMessage.GET_DELIVERIES_STATS)
  handleDeliveriesStatsGot(type: string) {
    return this.statisticsService.getDeliveriesStats(type);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(StatisticsMessage.GET_RESTAURANT_ORDERS_STATS)
  handleRestaurantOrdersStatsGot(data: GetRestaurantOrdersStatsMessage) {
    return this.statisticsService.getRestaurantOrdersStats(data);
  }
}

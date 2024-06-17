import { Controller, UseFilters } from '@nestjs/common';
import { ItemsService } from './items.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  ItemMessage,
  CreateItemMessage,
  EditItemMessage,
  DeleteItemMessage,
  GetItemMessage,
} from 'libs/common'; // Import the missing type
import { UnprocessableEntityExceptionFilter } from 'apps/api-gateway/src/filter/rpc-422-exception.filter';

@Controller()
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(ItemMessage.CREATE_ITEM)
  handleItemCreated(data: CreateItemMessage) {
    return this.itemsService.createItem(data);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(ItemMessage.EDIT_ITEM)
  handleItemEdited(data: EditItemMessage) {
    return this.itemsService.editItem(data);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(ItemMessage.DELETE_ITEM)
  handleItemDeleted(data: DeleteItemMessage) {
    return this.itemsService.deleteItem(data);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(ItemMessage.GET_ITEM)
  handleItemGot(data: GetItemMessage) {
    return this.itemsService.getItem(data);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(ItemMessage.GET_ITEMS)
  handleItemGotAll(restaurantId: string) {
    return this.itemsService.getAllItems(restaurantId);
  }
}

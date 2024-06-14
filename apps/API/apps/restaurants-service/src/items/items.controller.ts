import { Controller } from '@nestjs/common';
import { ItemsService } from './items.service';
import { MessagePattern } from '@nestjs/microservices';
import { ItemMessage, CreateItemMessage, EditItemMessage } from 'libs/common'; // Import the missing type

@Controller()
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @MessagePattern(ItemMessage.CREATE_ITEM)
  handleItemCreated(data: CreateItemMessage) {
    return this.itemsService.createItem(data);
  }

  @MessagePattern(ItemMessage.EDIT_ITEM)
  handleItemEdited(data: EditItemMessage) {
    return this.itemsService.editItem(data);
  }

  @MessagePattern(ItemMessage.DELETE_ITEM)
  handleItemDeleted(id: string) {
    return this.itemsService.deleteItem(id);
  }

  @MessagePattern(ItemMessage.GET_ITEM)
  handleItemGot(id: string) {
    return this.itemsService.getItem(id);
  }

  @MessagePattern(ItemMessage.GET_ITEMS)
  handleItemGotAll() {
    return this.itemsService.getAllItems();
  }
}

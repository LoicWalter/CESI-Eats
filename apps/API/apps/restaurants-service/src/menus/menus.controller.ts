import { Controller, UseFilters } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  MenuMessage,
  CreateMenuMessage,
  EditMenuMessage,
  DeleteMenuMessage,
  GetMenuMessage,
} from 'libs/common'; // Import the missing type
import { UnprocessableEntityExceptionFilter } from 'apps/api-gateway/src/filter/rpc-422-exception.filter';

@Controller()
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(MenuMessage.CREATE_MENU)
  handleMenuCreated(data: CreateMenuMessage) {
    return this.menusService.createMenu(data);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(MenuMessage.EDIT_MENU)
  handleMenuEdited(data: EditMenuMessage) {
    return this.menusService.editMenu(data);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(MenuMessage.DELETE_MENU)
  handleMenuDeleted(data: DeleteMenuMessage) {
    return this.menusService.deleteMenu(data);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(MenuMessage.GET_MENU)
  handleMenuGot(data: GetMenuMessage) {
    return this.menusService.getMenu(data);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(MenuMessage.GET_MENUS)
  handleMenuGotAll(restaurantId: string) {
    return this.menusService.getAllMenus(restaurantId);
  }
}

import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateClientMessage, ClientMessage } from 'libs/common';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: ClientMessage.CREATE_CLIENT })
  async createUser(data: CreateClientMessage) {
    return this.usersService.createUser(data);
  }
}

import { Controller, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserMessage, UserMessage } from 'libs/common';
import { UnprocessableEntityExceptionFilter } from 'apps/api-gateway/src/filter/rpc-422-exception.filter';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern({ cmd: UserMessage.CREATE_USER })
  createUser(data: CreateUserMessage) {
    return this.usersService.createUser(data);
  }
}

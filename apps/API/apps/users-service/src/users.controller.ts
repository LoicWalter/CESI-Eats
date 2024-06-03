import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventPattern } from '@nestjs/microservices';
import { CreateUserEvent, UserEvent } from '@app/common/events';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern(UserEvent.CREATE_USER)
  async handleUserCreated(data: CreateUserEvent) {
    console.log('Creating user :', data);
    this.usersService.createUser(data);
  }
}

import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserMessage, CreateUserMessage, Microservices, ErrorsMessages } from 'libs/common';
import { CreateClientDto } from '../dto';
import { firstValueFrom } from 'rxjs';
import { Role } from '@gen/client/users';

@Injectable()
export class AuthGatewayService {
  constructor(@Inject(Microservices.AUTH) private readonly authService: ClientProxy) {}

  async signUpUser(dto: CreateClientDto, role: Role) {
    try {
      return firstValueFrom(
        this.authService.send(
          { cmd: UserMessage.CREATE_USER },
          new CreateUserMessage(dto.email, dto.password, role),
        ),
      );
    } catch (error) {
      if (error.status === 422) {
        throw new UnprocessableEntityException(ErrorsMessages.USER_ALREADY_EXISTS);
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}

import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  AuthMessage,
  ClientMessage,
  CreateClientMessage,
  Microservices,
  SignInMessage,
} from 'libs/common';
import { CreateClientDto } from '../dto/create-client.dto';
import { firstValueFrom } from 'rxjs';
import { signInDto } from '../dto/sign-in.dto';

@Injectable()
export class AuthGatewayService {
  constructor(@Inject(Microservices.AUTH) private readonly authService: ClientProxy) {}

  async signUpClient(dto: CreateClientDto) {
    const response = await firstValueFrom(
      this.authService.send(
        { cmd: ClientMessage.CREATE_CLIENT },
        new CreateClientMessage(dto.email, dto.password),
      ),
    );
    if (response.response?.error) {
      throw new UnprocessableEntityException('User already exists.');
    }
    return response;
  }
}

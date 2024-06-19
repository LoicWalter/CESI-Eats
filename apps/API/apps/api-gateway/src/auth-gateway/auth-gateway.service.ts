import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  UserMessage,
  CreateUserMessage,
  Microservices,
  ErrorsMessages,
  EditUserMessage,
  GetUserMessage,
} from 'libs/common';
import { firstValueFrom, of } from 'rxjs';
import { Role } from '@gen/client/users';
import type { CreateUserDto } from '../types/user-utils.types';
import { join } from 'path';
import { EditUserDto } from '../dto';

@Injectable()
export class AuthGatewayService {
  constructor(@Inject(Microservices.AUTH) private readonly authService: ClientProxy) {}

  async updateUser(id: string, dto: EditUserDto, profilePicture: Express.Multer.File) {
    try {
      const response = await firstValueFrom(
        this.authService.send(
          { cmd: UserMessage.EDIT_USER },
          new EditUserMessage(id, dto, profilePicture?.filename),
        ),
      );
      return response;
    } catch (error) {
      if (error.status === 422) {
        throw new UnprocessableEntityException(ErrorsMessages.USER_ALREADY_EXISTS);
      }
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  getProfilePicture(id: string, res: any) {
    return of(res.sendFile(join(process.cwd(), 'uploads/profileimages/' + id)));
  }

  async getUser(id: string) {
    try {
      const response = await firstValueFrom(
        this.authService.send({ cmd: UserMessage.GET_USER }, new GetUserMessage(id)),
      );
      return response;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  getUsers() {
    try {
      return firstValueFrom(this.authService.send({ cmd: UserMessage.GET_ALL_USERS }, {}));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async signUpUser(dto: CreateUserDto, role: Role, profilePicture?: Express.Multer.File) {
    try {
      const response = await firstValueFrom(
        this.authService.send(
          { cmd: UserMessage.CREATE_USER },
          new CreateUserMessage(dto, role, profilePicture?.filename),
        ),
      );
      return response;
    } catch (error) {
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(ErrorsMessages.USER_ALREADY_EXISTS);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  deleteUser(id: string) {
    return firstValueFrom(this.authService.send({ cmd: UserMessage.DELETE_USER }, { id }));
  }
}

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
} from 'libs/common';
import { firstValueFrom, of } from 'rxjs';
import { Role, User } from '@gen/client/users';
import type { CreateUserDto } from '../types/user-utils.types';
import { join } from 'path';
import { EditUserDto } from '../dto';

@Injectable()
export class AuthGatewayService {
  constructor(@Inject(Microservices.AUTH) private readonly authService: ClientProxy) {}

  async updateUser(user: User, dto: EditUserDto, profilePicture: Express.Multer.File) {
    try {
      const response = await firstValueFrom(
        this.authService.send(
          { cmd: UserMessage.EDIT_USER },
          new EditUserMessage(user, dto, profilePicture?.filename),
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

  getProfilePicture(user: User, res: any) {
    return of(res.sendFile(join(process.cwd(), 'uploads/profileimages/' + user.profilePicture)));
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
        throw new UnprocessableEntityException(ErrorsMessages.USER_ALREADY_EXISTS);
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}

//! finir l'enregistrement des fichiers + authentification a refacto

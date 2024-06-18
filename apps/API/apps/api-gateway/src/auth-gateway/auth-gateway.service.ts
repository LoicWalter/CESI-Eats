import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
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
  private readonly logger = new Logger(AuthGatewayService.name);
  async updateUser(id: string, dto: EditUserDto, profilePicture: Express.Multer.File) {
    this.logger.log(`Updating user ${id}`);
    try {
      const response = await firstValueFrom(
        this.authService.send(
          { cmd: UserMessage.EDIT_USER },
          new EditUserMessage(id, dto, profilePicture?.filename),
        ),
      );
      this.logger.log(`User ${id} updated`);
      return response;
    } catch (error) {
      this.logger.error(`An error occured while updating user ${id} : ${error.message}`);
      if (error.status === 422) {
        throw new UnprocessableEntityException(ErrorsMessages.USER_ALREADY_EXISTS);
      }
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  getProfilePicture(id: string, res: any) {
    this.logger.log(`Getting profile picture for user ${id}`);
    return of(res.sendFile(join(process.cwd(), 'uploads/profileimages/' + id)));
  }

  async getUser(id: string) {
    this.logger.log(`Getting user ${id}`);
    try {
      const response = await firstValueFrom(
        this.authService.send({ cmd: UserMessage.GET_USER }, new GetUserMessage(id)),
      );
      this.logger.log(`User ${id} fetched`);
      return response;
    } catch (error) {
      this.logger.error(`An error occured while fetching user ${id} : ${error.message}`);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getUsers() {
    this.logger.log(`Getting all users`);
    try {
      const response = await firstValueFrom(
        this.authService.send({ cmd: UserMessage.GET_ALL_USERS }, {}),
      );
      this.logger.log(`All users fetched`);
      return response;
    } catch (error) {
      this.logger.error(`An error occured while fetching all users : ${error.message}`);
      throw new InternalServerErrorException(error.message);
    }
  }

  async signUpUser(dto: CreateUserDto, role: Role, profilePicture?: Express.Multer.File) {
    this.logger.log(`Creating user ${dto.email}`);
    try {
      const response = await firstValueFrom(
        this.authService.send(
          { cmd: UserMessage.CREATE_USER },
          new CreateUserMessage(dto, role, profilePicture?.filename),
        ),
      );
      this.logger.log(`User ${dto.email} created`);
      return response;
    } catch (error) {
      this.logger.error(`An error occured while creating user ${dto.email} : ${error.message}`);
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(ErrorsMessages.USER_ALREADY_EXISTS);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteUser(id: string) {
    this.logger.log(`Deleting user ${id}`);
    try {
      const response = await firstValueFrom(
        this.authService.send({ cmd: UserMessage.DELETE_USER }, { id }),
      );
      this.logger.log(`User ${id} deleted`);
      return response;
    } catch (error) {
      this.logger.error(`An error occured while deleting user ${id} : ${error.message}`);
      throw new InternalServerErrorException(error.message);
    }
  }
}

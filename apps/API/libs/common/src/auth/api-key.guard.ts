import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Microservices } from '../microservices';
import { ClientProxy } from '@nestjs/microservices';
import { AuthMessage } from '../messages';
import { firstValueFrom } from 'rxjs';
import { ErrorsMessages } from '../errors';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(@Inject(Microservices.AUTH) private authService: ClientProxy) {} // made up service for the point of the exmaple

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const key = req.headers['x-api-key'] ?? req.query.api_key; // checks the header, moves to query if null
    const myApiKey = process.env.API_KEY;

    if (!key) {
      throw new UnauthorizedException(ErrorsMessages.API_KEY_NOT_PROVIDED);
    }

    if (key === myApiKey) {
      return true;
    }

    const response = await firstValueFrom(
      this.authService.send(AuthMessage.VALIDATE_API_KEY, {
        API_KEY: key,
      }),
    );

    if (!response) {
      throw new UnauthorizedException(ErrorsMessages.INVALID_API_KEY);
    }

    return true;
  }
}

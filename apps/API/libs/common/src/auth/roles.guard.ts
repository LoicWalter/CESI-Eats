import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@gen/client/users';
import { catchError, Observable, tap } from 'rxjs';
import { AuthMessage, ErrorsMessages, ROLES_KEY } from 'libs/common';
import { Microservices } from '../microservices/microservices.names';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(Microservices.AUTH) private authService: ClientProxy,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const authentication = this.getAuthentication(context);
    return this.authService
      .send(AuthMessage.VALIDATE_USER, { Authentication: authentication })
      .pipe(
        tap((user: any) => {
          if (!requiredRoles.some((role) => user.roles?.includes(role))) {
            throw new UnauthorizedException(ErrorsMessages.USER_DONT_HAVE_REQUIRED_ROLES);
          }
        }),
        catchError(() => {
          throw new UnauthorizedException(ErrorsMessages.USER_DONT_HAVE_REQUIRED_ROLES);
        }),
      );
  }

  private getAuthentication(context: ExecutionContext) {
    let authentication: string;
    if (context.getType() === 'rpc') {
      authentication = context.switchToRpc().getData().Authentication;
    } else if (context.getType() === 'http') {
      authentication = context.switchToHttp().getRequest().cookies?.Authentication;
    }

    if (!authentication) {
      throw new UnauthorizedException(ErrorsMessages.AUTH_HEADER_NOT_PROVIDED);
    }

    return authentication;
  }
}

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@gen/client/users';
import { Observable } from 'rxjs';
import { ErrorsMessages, getCurrentUserByContext, ROLES_KEY } from 'libs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const userRoles = getCurrentUserByContext(context)?.roles;
    if (!userRoles) {
      throw new UnauthorizedException(ErrorsMessages.USER_DONT_HAVE_REQUIRED_ROLES);
    }

    if (userRoles.includes(Role.ADMIN)) {
      return true;
    }

    const hasRole = requiredRoles.some((role) => userRoles?.includes(role));

    if (!hasRole) {
      throw new UnauthorizedException(ErrorsMessages.USER_DONT_HAVE_REQUIRED_ROLES);
    }
    return true;
  }
}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import {
  ADMIN_KEY,
  PUBLIC_KEY,
  ROLES_KEY,
} from '../../constans/key-decorators';
import { ROLES } from '../../constans';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest<Request>();

    const { role } = req;

    if (roles === undefined) {
      if (!admin) {
        return true;
      } else if (admin && role === admin) {
        return true;
      } else {
        throw new UnauthorizedException(
          'No tenes permismos para esta operación',
        );
      }
    }

    if (role === ROLES.ADMIN || role === ROLES.CREATOR) return true;

    const isAuth = roles.some((r) => r === role);

    if (!isAuth) {
      throw new UnauthorizedException('No tenes permismos para esta operación');
    }

    return true;
  }
}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { Observable } from 'rxjs';
import {
  ACCESS_LEVEL_KEY,
  ADMIN_KEY,
  PUBLIC_KEY,
  ROLES_KEY,
} from '../../constans/key-decorators';
import { UsersService } from '../../users/services/users.service';
import { ACCESS_LEVEL, ROLES } from 'src/constans';
import { Request } from 'express';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext) {
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

    const accessLevel = this.reflector.get<Array<keyof typeof ACCESS_LEVEL>>(
      ACCESS_LEVEL_KEY,
      context.getHandler(),
    );

    const { role, idUser } = req;

    if (accessLevel === undefined) {
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
    }

    if (role === ROLES.ADMIN || role === ROLES.CREATOR) return true;

    const user = await this.userService.findUserById(idUser);
    const UserExistInProject = user.projectInclude.find(
      (project) => project.project.id === Number(req.params.projectId),
    );

    if (UserExistInProject === undefined) {
      throw new UnauthorizedException('No formas parte del proyecto');
    }

    const userAccessLevelKey = Object.keys(ACCESS_LEVEL).find(
      (key) => ACCESS_LEVEL[key] === UserExistInProject.accessLevel,
    ) as keyof typeof ACCESS_LEVEL;

    const levelCurrentDecorator = accessLevel.some(
      (level) => level === userAccessLevelKey,
    );

    if (!levelCurrentDecorator) {
      throw new UnauthorizedException('No tienes el nivel de acceso necesario');
    }

    return true;
  }
}

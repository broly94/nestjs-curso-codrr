import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../users/services/users.service';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from '../../constans/key-decorators';
import { Request } from 'express';
import { useToken } from 'src/utils/use.token';
import { IUseToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers['token_access'];

    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('token invalid');
    }

    const manageToken: IUseToken | string = useToken(token);

    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken);
    }

    if (manageToken.isExpired) {
      throw new UnauthorizedException('token expired');
    }

    const { id } = manageToken;

    const user = await this.userService.findUserById(id);

    if (!user) {
      throw new UnauthorizedException('invalid user');
    }

    req.idUser = user.id;
    req.role = user.role;
    return true;
  }
}

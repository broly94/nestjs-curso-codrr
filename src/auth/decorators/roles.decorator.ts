import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../../constans/key-decorators';
import { ROLES } from '../../constans';

export const Roles = (...roles: Array<keyof typeof ROLES>) =>
  SetMetadata(ROLES_KEY, roles);

import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../../constans/key-decorators';
import { ROLES } from '../../constans';

export const Roles = (roles: ROLES) => SetMetadata(ROLES_KEY, roles);

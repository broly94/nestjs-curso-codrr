import { SetMetadata } from '@nestjs/common';
import { ADMIN_KEY } from '../../constans/key-decorators';
import { ROLES } from '../../constans';

export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN);

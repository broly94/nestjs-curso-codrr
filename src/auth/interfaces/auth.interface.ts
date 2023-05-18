import { ROLES } from 'src/constans';

export interface PayloadToken {
  sub: number;
  role: ROLES;
}

export interface AuthBody {
  username: string;
  password: string;
}

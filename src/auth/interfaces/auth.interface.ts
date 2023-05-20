import { ROLES } from 'src/constans';

export interface PayloadToken {
  id: number;
  role: ROLES;
}

export interface AuthBody {
  username: string;
  password: string;
}

export interface AuthTokenResult {
  id: number;
  iat: number;
  exp: number;
  role: ROLES;
}

export interface IUseToken {
  id: number;
  isExpired: boolean;
  role: ROLES;
}

export interface AuthResponse {
  accessToken: string;
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  username: string;
  role: ROLES;
}

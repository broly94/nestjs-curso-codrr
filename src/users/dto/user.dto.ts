import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ACCESS_LEVEL, ROLES } from '../../constans';
import { UsersEntity } from '../entities/users.entity';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;
}

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(ROLES)
  role: ROLES;
}

export class RelationToProjectDto {
  @IsNotEmpty()
  @IsEnum(ACCESS_LEVEL)
  accessLevel: ACCESS_LEVEL;

  @IsNotEmpty()
  @IsInt()
  user: UsersEntity;

  @IsNotEmpty()
  @IsInt()
  project: ProjectsEntity;
}

export class UpdateRelationToProjectDto {
  @IsOptional()
  @IsEnum(ACCESS_LEVEL)
  access_level: ACCESS_LEVEL;

  @IsOptional()
  @IsInt()
  user: number;

  @IsOptional()
  @IsInt()
  project: number;
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UsersEntity } from '../entities/users.entity';
import { UsersProjectsEntity } from '../entities/usersProjects.entity';
import { RelationToProjectDto, UserDto, UserUpdateDto } from '../dto/user.dto';
import { ErrorManager } from '../../utils/error.manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(UsersProjectsEntity)
    private readonly userProjectRepository: Repository<UsersProjectsEntity>,
  ) {}

  public async createUser(body: UserDto): Promise<UsersEntity> {
    try {
      body.password = bcrypt.hashSync(
        body.password,
        Number(process.env.HASH_SALT),
      );
      return this.userRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUsers(): Promise<UsersEntity[]> {
    try {
      const users: UsersEntity[] = await this.userRepository
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.projectInclude', 'projectInclude')
        .leftJoinAndSelect('projectInclude.project', 'project')
        .select([
          'users.id',
          'users.firstName',
          'users.lastName',
          'users.age',
          'users.email',
          'users.username',
          'users.role',
          'projectInclude.accessLevel',
          'project.id',
          'project.name',
          'project.description',
        ])
        .getMany();
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro el resultado',
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUserById(id: number): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('users')
        .where({ id })
        .leftJoinAndSelect('users.projectInclude', 'projectInclude')
        .leftJoinAndSelect('projectInclude.project', 'project')
        .select([
          'users.id',
          'users.firstName',
          'users.lastName',
          'users.age',
          'users.email',
          'users.username',
          'users.role',
          'projectInclude.accessLevel',
          'project.id',
          'project.name',
          'project.description',
        ])
        .getOne();
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro el resultado',
        });
      }
      return user;
    } catch (error) {
      console.log(error.message);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findBy({ key, value }: { key: keyof UserDto; value: any }) {
    try {
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .select()
        .where({ [key]: value })
        .getOne();
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateUser(
    body: UserUpdateDto,
    id: number,
  ): Promise<UpdateResult | undefined> {
    try {
      const user = await this.userRepository.update(id, body);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteUser(id: number): Promise<DeleteResult> {
    try {
      const user = await this.userRepository.delete(id);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo borrar',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async relationToProject(
    body: RelationToProjectDto,
  ): Promise<RelationToProjectDto> {
    try {
      return this.userProjectRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}

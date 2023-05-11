import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { UserDto, UserUpdateDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  public async createUser(body: UserDto): Promise<UsersEntity> {
    try {
      return this.userRepository.save(body);
    } catch (error) {
      console.log(error);
    }
  }

  public async findUsers(): Promise<UsersEntity[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  public async findUserById(id: number): Promise<UsersEntity> {
    try {
      return this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();
    } catch (error) {
      console.log(error);
    }
  }

  public async updateUser(
    body: UserUpdateDto,
    id: number,
  ): Promise<UpdateResult | undefined> {
    try {
      const user = await this.userRepository.update(id, body);
      if (user.affected === 0) return undefined;
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteUser(id: number): Promise<DeleteResult> {
    try {
      const user = await this.userRepository.delete(id);
      if (user.affected === 0) return undefined;
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

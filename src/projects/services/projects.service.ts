import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsEntity } from '../entities/projects.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectDto, ProjectUpdateDto } from '../dto/project.dto';
import { ErrorManager } from '../../utils/error.manager';
import { UsersProjectsEntity } from '../../users/entities/usersProjects.entity';
import { UsersService } from '../../users/services/users.service';
import { ACCESS_LEVEL } from '../../constans';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectRepository: Repository<ProjectsEntity>,
    @InjectRepository(UsersProjectsEntity)
    private readonly usersProjectsRepository: Repository<UsersProjectsEntity>,
    private readonly userService: UsersService,
  ) {}

  public async findProjects(): Promise<ProjectsEntity[]> {
    try {
      const projects = await this.projectRepository
        .createQueryBuilder('projects')
        .leftJoinAndSelect('projects.userInclude', 'userInclude')
        .leftJoinAndSelect('userInclude.user', 'user')
        .select([
          'projects.id',
          'projects.name',
          'projects.description',
          'userInclude.accessLevel',
          'user.id',
          'user.firstName',
          'user.lastName',
          'user.age',
          'user.email',
          'user.username',
          'user.role',
        ])
        .getMany();
      if (projects.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontraron datos',
        });
      }
      return projects;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findProject(id: number): Promise<ProjectsEntity> {
    try {
      const user = await this.projectRepository
        .createQueryBuilder('projects')
        .where({ id })
        .leftJoinAndSelect('projects.userInclude', 'userInclude')
        .leftJoinAndSelect('userInclude.user', 'user')
        .select([
          'projects.id',
          'projects.name',
          'projects.description',
          'userInclude.accessLevel',
          'user.id',
          'user.firstName',
          'user.lastName',
          'user.age',
          'user.email',
          'user.username',
          'user.role',
        ])
        .getOne();
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontraron datos',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async createProject(
    body: ProjectDto,
    userOwnerId: number,
  ): Promise<any> {
    try {
      const user = await this.userService.findUserById(userOwnerId);
      const project = await this.projectRepository.save(body);
      return await this.usersProjectsRepository.save({
        accessLevel: ACCESS_LEVEL.OWNER,
        user,
        project,
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateProject(
    body: ProjectUpdateDto,
    id: number,
  ): Promise<UpdateResult | undefined> {
    try {
      const project = await this.projectRepository.update(id, body);
      if (project.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudieron actualizar los datos',
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteProject(id: number): Promise<DeleteResult> {
    try {
      const user = await this.projectRepository.delete(id);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se puedo eliminar',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}

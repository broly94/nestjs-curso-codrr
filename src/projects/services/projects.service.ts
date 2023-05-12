import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsEntity } from '../entities/projects.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectDto } from '../dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectRepository: Repository<ProjectsEntity>,
  ) {}

  findProjects(): Promise<ProjectsEntity[]> {
    try {
      return this.projectRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  findProject(id: string): Promise<ProjectsEntity> {
    try {
      return this.projectRepository
        .createQueryBuilder('project')
        .where({ id })
        .getOne();
    } catch (error) {
      console.log(error);
    }
  }

  createProject(body: ProjectDto): Promise<ProjectsEntity> {
    try {
      return this.projectRepository.save(body);
    } catch (error) {
      console.log(error);
    }
  }

  async updateProject(
    body: ProjectDto,
    id: number,
  ): Promise<UpdateResult | undefined> {
    try {
      const project = await this.projectRepository.update(body, { id });
      if (project.affected === 0) return undefined;
      return project;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProject(id: number): Promise<DeleteResult> {
    try {
      return this.projectRepository.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}

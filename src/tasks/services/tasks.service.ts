import { Injectable } from '@nestjs/common';
import { TasksEntity } from '../entities/tasks.entity';
import { Repository } from 'typeorm';
import { ProjectsService } from '../../projects/services/projects.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectDto } from '../../projects/dto/project.dto';
import { TasksDto } from '../dto/tasks.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly taskRepository: Repository<TasksEntity>,
    private readonly projectService: ProjectsService,
  ) {}

  public async createTask(body: TasksDto, projectId: number) {
    try {
      const project = await this.projectService.findProject(projectId);
      return this.taskRepository.save({
        ...body,
        project,
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findTasks() {
    try {
      return this.taskRepository.find({
        relations: {
          project: true,
        },
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}

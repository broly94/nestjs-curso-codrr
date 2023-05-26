import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { StatusTasks } from '../../constans/status-tasks';
import { ProjectsEntity } from '../../projects/entities/projects.entity';

export class TasksDto {
  @IsNotEmpty()
  @IsString()
  taskName: string;

  @IsNotEmpty()
  @IsString()
  taskDescriptions: string;

  @IsNotEmpty()
  @IsEnum(StatusTasks)
  status: StatusTasks;

  @IsNotEmpty()
  @IsString()
  responsableName: string;

  @IsOptional()
  project: ProjectsEntity;
}

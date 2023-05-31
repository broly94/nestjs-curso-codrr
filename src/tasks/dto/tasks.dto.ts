import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { StatusTasks } from '../../constans/status-tasks';
import { ProjectsEntity } from '../../projects/entities/projects.entity';
import { ApiProperty } from '@nestjs/swagger';

export class TasksDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  taskName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  taskDescriptions: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(StatusTasks)
  status: StatusTasks;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  responsableName: string;

  @ApiProperty()
  @IsOptional()
  project: ProjectsEntity;
}

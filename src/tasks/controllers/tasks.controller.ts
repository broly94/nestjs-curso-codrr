import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { TasksDto } from '../dto/tasks.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AccessLevelGuard } from '../../auth/guards/access-level.guard';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Roles('BASIC')
  @AccessLevel('OWNER')
  @Post('create/:projectId')
  public async createTask(
    @Body() body: TasksDto,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return await this.taskService.createTask(body, projectId);
  }

  @Get('project/:projectId')
  public async findTasksById(
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.taskService.findTasksById(projectId);
  }
}

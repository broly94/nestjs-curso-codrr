import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDto, ProjectUpdateDto } from '../dto/project.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AccessLevelGuard } from '../../auth/guards/access-level.guard';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';

@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get()
  public async findAllProjects() {
    return await this.projectService.findProjects();
  }

  @AccessLevel(50)
  @Get(':projectId')
  public async findProjectById(@Param('projectId') id: number) {
    return await this.projectService.findProject(id);
  }

  @Post('register')
  public async createProject(@Body() body: ProjectDto) {
    return await this.projectService.createProject(body);
  }

  @AccessLevel(50)
  @Patch('edit/:projectId')
  public async updateProject(
    @Body() body: ProjectUpdateDto,
    @Param('projectId') id: number,
  ) {
    return await this.projectService.updateProject(body, id);
  }

  @Delete(':projectId')
  public async deleteProject(@Param() id: number) {
    return await this.projectService.deleteProject(id);
  }
}

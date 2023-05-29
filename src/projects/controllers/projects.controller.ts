import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDto, ProjectUpdateDto } from '../dto/project.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AccessLevelGuard } from '../../auth/guards/access-level.guard';
import { AccessLevel } from '../../auth/decorators/access-level.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';

@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Roles('CREATOR', 'ADMIN')
  @AccessLevel('MANTEINER', 'OWNER')
  @Get()
  public async findAllProjects() {
    return await this.projectService.findProjects();
  }

  @Roles('BASIC')
  @AccessLevel('DEVELOPER', 'MANTEINER', 'OWNER')
  @Get(':projectId')
  public async findProjectById(@Param('projectId') id: number) {
    return await this.projectService.findProject(id);
  }

  @Roles('CREATOR', 'ADMIN')
  @AccessLevel('OWNER')
  @Post('register/:userOwnerId')
  public async createProject(
    @Body() body: ProjectDto,
    @Param('userOwnerId', ParseIntPipe) userOwnerId: number,
  ) {
    return await this.projectService.createProject(body, userOwnerId);
  }

  @Roles('CREATOR', 'ADMIN')
  @Patch('edit/:projectId')
  public async updateProject(
    @Body() body: ProjectUpdateDto,
    @Param('projectId') id: number,
  ) {
    return await this.projectService.updateProject(body, id);
  }

  @Roles('ADMIN')
  @Delete(':projectId')
  public async deleteProject(@Param('projectId') id: number) {
    return await this.projectService.deleteProject(id);
  }
}

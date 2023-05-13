import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDto, ProjectUpdateDto } from '../dto/project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get()
  public async findAllProjects() {
    return await this.projectService.findProjects();
  }

  @Get(':id')
  public async findProjectById(@Param('id') id: number) {
    return await this.projectService.findProject(id);
  }

  @Post('register')
  public async createProject(@Body() body: ProjectDto) {
    return await this.projectService.createProject(body);
  }

  @Patch('edit/:id')
  public async updateProject(
    @Body() body: ProjectUpdateDto,
    @Param('id') id: number,
  ) {
    return await this.projectService.updateProject(body, id);
  }

  @Delete(':id')
  public async deleteProject(@Param() id: number) {
    return await this.projectService.deleteProject(id);
  }
}

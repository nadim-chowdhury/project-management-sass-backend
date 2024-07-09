import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Project> {
    return this.projectService.findById(id);
  }

  @Post()
  async create(@Body() projectData: Partial<Project>): Promise<Project> {
    return this.projectService.create(projectData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() projectData: Partial<Project>,
  ): Promise<Project> {
    return this.projectService.update(id, projectData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.projectService.delete(id);
  }
}

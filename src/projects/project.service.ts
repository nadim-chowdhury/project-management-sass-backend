import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find({ relations: ['tasks'] });
  }

  async findById(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne(id, {
      relations: ['tasks'],
    });
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    return project;
  }

  async create(projectData: Partial<Project>): Promise<Project> {
    const newProject = this.projectRepository.create(projectData);
    return await this.projectRepository.save(newProject);
  }

  async update(id: number, projectData: Partial<Project>): Promise<Project> {
    await this.projectRepository.update(id, projectData);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }
}

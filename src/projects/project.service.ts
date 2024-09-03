import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  async findAll(): Promise<ProjectEntity[]> {
    return await this.projectRepository.find({
      relations: ['tasks', 'owner'], // Include 'owner' relation if needed
    });
  }

  async findById(id: number): Promise<ProjectEntity> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['tasks', 'owner'], // Include 'owner' relation if needed
    });
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    return project;
  }

  async create(projectData: Partial<ProjectEntity>): Promise<ProjectEntity> {
    const newProject = this.projectRepository.create(projectData);
    return await this.projectRepository.save(newProject);
  }

  async update(
    id: number,
    projectData: Partial<ProjectEntity>,
  ): Promise<ProjectEntity> {
    await this.projectRepository.update(id, projectData);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    const result = await this.projectRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
  }
}

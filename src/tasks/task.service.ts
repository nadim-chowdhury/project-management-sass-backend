import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { ProjectEntity } from '../projects/project.entity';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({
      relations: ['project', 'subtasks', 'assignee'],
    });
  }

  async findById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['project', 'subtasks', 'assignee'],
    });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    // Find the associated project by ID
    const project = await this.projectRepository.findOne({
      where: { id: createTaskDto.projectId },
    });
    if (!project) {
      throw new NotFoundException(
        `Project with id ${createTaskDto.projectId} not found`,
      );
    }

    // Find the assignee user by ID if provided
    let assignee: UserEntity | null = null;
    if (createTaskDto.assigneeId) {
      assignee = await this.userRepository.findOne({
        where: { id: createTaskDto.assigneeId },
      });
      if (!assignee) {
        throw new NotFoundException(
          `User with id ${createTaskDto.assigneeId} not found`,
        );
      }
    }

    const newTask = this.taskRepository.create({
      ...createTaskDto,
      project, // Associate the project entity
      assignee, // Associate the assignee entity if provided
    });

    return await this.taskRepository.save(newTask);
  }

  async update(id: number, taskData: Partial<Task>): Promise<Task> {
    await this.taskRepository.update(id, taskData);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}

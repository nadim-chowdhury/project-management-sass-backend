import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({
      relations: ['project', 'subtasks'],
    });
  }

  async findById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id, {
      relations: ['project', 'subtasks'],
    });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async create(taskData: Partial<Task>): Promise<Task> {
    const newTask = this.taskRepository.create(taskData);
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

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async findAll(): Promise<TaskEntity[]> {
    return await this.taskRepository.find();
  }

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const newTask = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(newTask);
  }
}
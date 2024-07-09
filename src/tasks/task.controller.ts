import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Task> {
    return this.taskService.findById(id);
  }

  @Post()
  async create(@Body() taskData: Partial<Task>): Promise<Task> {
    return this.taskService.create(taskData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() taskData: Partial<Task>,
  ): Promise<Task> {
    return this.taskService.update(id, taskData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.taskService.delete(id);
  }
}

import { Controller, Get, Logger } from '@nestjs/common';
import { LoggingService } from '../logging/logging.service';

@Controller('tasks')
export class TasksController {
  private readonly logger = new Logger(TasksController.name);

  constructor(private readonly loggingService: LoggingService) {}

  @Get()
  findAll(): string {
    this.logger.log('Finding all tasks...');
    return 'This action returns all tasks';
  }
}

import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { TaskEntity } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(): Promise<TaskEntity[]> {
    return this.tasksService.findAll();
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksService.create(createTaskDto);
  }
}

import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { TaskEntity } from './task.entity';
import { SocketGateway } from '../socket.gateway';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly socketGateway: SocketGateway,
  ) {}

  @Get()
  async findAll(): Promise<TaskEntity[]> {
    return this.tasksService.findAll();
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const newTask = await this.tasksService.create(createTaskDto);
    this.socketGateway.server.emit('taskCreated', newTask); // Emit event to clients
    return newTask;
  }
}

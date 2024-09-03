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
import { CreateTaskDto } from './dto/create-task.dto';
import { SocketGateway } from 'src/socket.gateway';
import { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly socketGateway: SocketGateway, // Assuming you have a SocketGateway defined for WebSocket integration
  ) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Task> {
    return this.taskService.findById(id);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = await this.taskService.create(createTaskDto);
    this.socketGateway.server.emit('taskCreated', newTask); // Emit event to clients
    return newTask;
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

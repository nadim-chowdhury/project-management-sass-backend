import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { ProjectModule } from '../projects/project.module'; // Import ProjectModule
import { UserModule } from '../users/user.module'; // Import UserModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    ProjectModule, // Importing ProjectModule to make ProjectEntityRepository available
    UserModule, // Importing UserModule to make UserEntityRepository available
  ],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}

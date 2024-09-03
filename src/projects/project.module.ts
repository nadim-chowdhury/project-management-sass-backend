import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectEntity } from './project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [TypeOrmModule], // Exporting TypeOrmModule to make ProjectEntity available in other modules
})
export class ProjectModule {}

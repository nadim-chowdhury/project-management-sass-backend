import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Project } from '../projects/project.entity';
import { Subtask } from './subtask.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 'open' }) // initial status
  status: string;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  @OneToMany(() => Subtask, (subtask) => subtask.task)
  subtasks: Subtask[];
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { ProjectEntity } from '../projects/project.entity';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.tasks, { nullable: true })
  assignee: UserEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.tasks)
  project: ProjectEntity;
}
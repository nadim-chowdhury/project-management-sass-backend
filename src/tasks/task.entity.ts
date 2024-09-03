import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ProjectEntity } from '../projects/project.entity';
import { UserEntity } from '../users/user.entity';
import { Subtask } from './subtask.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'open' })
  status: string;

  @ManyToOne(() => ProjectEntity, (project) => project.tasks)
  project: ProjectEntity;

  @ManyToOne(() => UserEntity, (user) => user.tasks, { nullable: true })
  assignee: UserEntity;

  @OneToMany(() => Subtask, (subtask) => subtask.task)
  subtasks: Subtask[];
}

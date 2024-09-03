import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { Task } from '../tasks/task.entity';

@Entity('projects')
export class ProjectEntity {
  // This is the single entity to represent projects
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.ownedProjects)
  owner: UserEntity;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}

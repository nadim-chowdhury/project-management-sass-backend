import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProjectEntity } from '../projects/project.entity'; // Ensure these entities exist in your project
import { Task } from '../tasks/task.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Hashed password

  @Column()
  role: string; // Roles like 'admin', 'member', 'guest'

  @OneToMany(() => ProjectEntity, (project) => project.owner)
  ownedProjects: ProjectEntity[];

  @OneToMany(() => Task, (task) => task.assignee)
  tasks: Task[];
}

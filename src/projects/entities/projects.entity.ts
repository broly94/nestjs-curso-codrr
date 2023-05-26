import { IProject } from '../../interfaces';
import { BaseEntity } from '../../config/base.entity';

import { UsersProjectsEntity } from '../../users/entities/usersProjects.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { TasksEntity } from '../../tasks/entities/tasks.entity';

@Entity('projects')
export class ProjectsEntity extends BaseEntity implements IProject {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(
    () => UsersProjectsEntity,
    (usersProjects) => usersProjects.project,
  )
  userInclude: UsersProjectsEntity[];

  @OneToMany(() => TasksEntity, (tasks) => tasks.project)
  tasks: TasksEntity[];
}

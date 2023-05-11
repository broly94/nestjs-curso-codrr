import { IProject } from '../../interfaces';
import { BaseEntity } from '../../config/base.entity';

import { UsersProjectsEntity } from '../../users/entities/usersProjects.entity';
import { Column, Entity, OneToMany } from 'typeorm';

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
  userIncludes: UsersProjectsEntity[];
}

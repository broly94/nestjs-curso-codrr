import { BaseEntity } from '../../config/base.entity';
import { ACCESS_LEVEL } from '../../constans';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UsersEntity } from './users.entity';
import { ProjectsEntity } from '../../projects/entities/projects.entity';

@Entity('UsersProjects')
export class UsersProjectsEntity extends BaseEntity {
  @Column({ type: 'enum', enum: ACCESS_LEVEL })
  accessLevel: ACCESS_LEVEL;

  @ManyToOne(() => UsersEntity, (user) => user.projectInclude)
  user: UsersEntity;

  @ManyToOne(() => ProjectsEntity, (project) => project.userIncludes)
  project: ProjectsEntity;
}
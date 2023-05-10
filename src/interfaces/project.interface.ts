import { UsersProjectsEntity } from 'src/users/entities/usersProjects.entity';

export interface IProject {
  name: string;
  description: string;
  userIncludes: UsersProjectsEntity[];
}

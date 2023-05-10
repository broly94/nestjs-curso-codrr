import { UsersProjectsEntity } from 'src/users/entities/usersProjects.entity';

export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  username: string;
  role: string;
  projectInclude: UsersProjectsEntity[];
}

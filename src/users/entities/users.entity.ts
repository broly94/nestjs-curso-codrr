import { BaseEntity } from '../../config/base.entity';
import { ROLES } from '../../constans';
import { IUser } from '../../interfaces';
import { Column, Entity, OneToMany } from 'typeorm';
import { UsersProjectsEntity } from './usersProjects.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UsersEntity extends BaseEntity implements IUser {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;

  @OneToMany(() => UsersProjectsEntity, (usersProjects) => usersProjects.user)
  projectInclude: UsersProjectsEntity[];
}

import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { StatusTasks } from '../../constans/status-tasks';
import { ProjectsEntity } from '../../projects/entities/projects.entity';

@Entity('tasks')
export class TasksEntity extends BaseEntity {
  @Column()
  taskName: string;

  @Column()
  taskDescriptions: string;

  @Column({ type: 'enum', enum: StatusTasks })
  status: StatusTasks;

  @Column()
  responsableName: string;

  @ManyToOne(() => ProjectsEntity, (projects) => projects.tasks)
  @JoinColumn({ name: 'project_id' })
  project: ProjectsEntity;
}

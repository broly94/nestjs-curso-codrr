import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './controllers/projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/services/users.service';
import { UsersProjectsEntity } from 'src/users/entities/usersProjects.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectsEntity, UsersProjectsEntity]),
    UsersModule,
  ],
  providers: [ProjectsService, UsersService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}

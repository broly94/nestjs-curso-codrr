import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UsersEntity } from './entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

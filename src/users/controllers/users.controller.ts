import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { RelationToProjectDto, UserDto, UserUpdateDto } from '../dto/user.dto';
import { CreateUsersInterceptor } from '../interceptors/users.interceptor';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { PublicAccess } from '../../auth/decorators/public.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { ROLES } from '../../constans';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly userServices: UsersService) {}

  @Get()
  @Roles(ROLES.ADMIN)
  public async findAllUsers() {
    return await this.userServices.findUsers();
  }

  @Roles(ROLES.ADMIN)
  @Get(':id')
  public async findUser(@Param('id') id: number) {
    return await this.userServices.findUserById(id);
  }

  @PublicAccess()
  @UseInterceptors(new CreateUsersInterceptor())
  @Post('register')
  public async registerUser(@Body() body: UserDto) {
    return await this.userServices.createUser(body);
  }

  @Roles(ROLES.ADMIN)
  @Patch('edit/:id')
  public async updateUser(
    @Body() body: UserUpdateDto,
    @Param('id') id: number,
  ) {
    return await this.userServices.updateUser(body, id);
  }

  @Roles(ROLES.ADMIN)
  @Delete(':id')
  public async deleteUser(@Param('id') id: number) {
    return await this.userServices.deleteUser(id);
  }

  @Roles(ROLES.ADMIN)
  @Post('add-to-project')
  public async addToProject(@Body() body: RelationToProjectDto) {
    return await this.userServices.relationToProject(body);
  }
}

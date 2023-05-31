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
// import { PublicAccess } from '../../auth/decorators/public.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AdminAccess } from '../../auth/decorators/admin.decorator';
import { PublicAccess } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';

/**
 * PublicAccess: No hace falta que se loguee o genere su token para hacer las peticiones http
 * AdminAccess: Necesita estar logueado o enviar un token, ademas el usuario tiene que tener rol ADMIN para ejecutar las peticiones http
 * ROLES.BASIC: Necesita estar logueado o enviar un token, puede ejecutar las peticiones http en base a su rol BASIC
 */

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly userServices: UsersService) {}

  @ApiHeader({
    name: 'token_access',
  })
  @AdminAccess()
  @Get()
  public async findAllUsers() {
    return await this.userServices.findUsers();
  }

  @ApiParam({ name: 'id' })
  @ApiHeader({
    name: 'token_access',
  })
  @AdminAccess()
  @Get(':id')
  public async findUser(@Param('id') id: number) {
    return await this.userServices.findUserById(id);
  }

  @ApiHeader({
    name: 'token_access',
  })
  @PublicAccess()
  @UseInterceptors(new CreateUsersInterceptor())
  @Post('register')
  public async registerUser(@Body() body: UserDto) {
    return await this.userServices.createUser(body);
  }

  @ApiHeader({
    name: 'token_access',
  })
  @ApiParam({ name: 'id' })
  @AdminAccess()
  @Patch('edit/:id')
  public async updateUser(
    @Body() body: UserUpdateDto,
    @Param('id') id: number,
  ) {
    return await this.userServices.updateUser(body, id);
  }

  @ApiHeader({
    name: 'token_access',
  })
  @ApiParam({ name: 'id' })
  @AdminAccess()
  @Delete(':id')
  public async deleteUser(@Param('id') id: number) {
    return await this.userServices.deleteUser(id);
  }

  @ApiHeader({
    name: 'token_access',
  })
  @Roles('CREATOR', 'ADMIN')
  @Post('add-to-project')
  public async addToProject(@Body() body: RelationToProjectDto) {
    return await this.userServices.relationToProject(body);
  }
}

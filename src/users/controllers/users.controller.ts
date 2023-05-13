import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto, UserUpdateDto } from '../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UsersService) {}

  @Get()
  public async findAllUsers() {
    return await this.userServices.findUsers();
  }

  @Get(':id')
  public async findUser(@Param('id') id: number) {
    return await this.userServices.findUserById(id);
  }

  @Post('register')
  public async registerUser(@Body() body: UserDto) {
    return await this.userServices.createUser(body);
  }

  @Patch('edit/:id')
  public async updateUser(
    @Body() body: UserUpdateDto,
    @Param('id') id: number,
  ) {
    return await this.userServices.updateUser(body, id);
  }

  @Delete(':id')
  public async deleteUser(@Param('id') id: number) {
    return await this.userServices.deleteUser(id);
  }
}

import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dto/auth.dto';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { AuthResponse } from '../interfaces/auth.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(new AuthInterceptor())
  @Post('login')
  public async login(
    @Body() { username, password }: AuthDto,
  ): Promise<AuthResponse> {
    const userValidate = await this.authService.validateUser(
      username,
      password,
    );

    if (!userValidate) {
      throw new UnauthorizedException('Los datos no son válidos');
    }

    return await this.authService.generateJWT(userValidate);
  }
}

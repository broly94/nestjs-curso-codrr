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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(new AuthInterceptor())
  @Post('login')
  public async login(@Body() { username, password }: AuthDto) {
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

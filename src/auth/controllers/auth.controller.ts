import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthBody } from '../interfaces/auth.interface';
import { AuthDto } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() { username, password }: AuthDto) {
    const userValidate = await this.authService.validateUser(
      username,
      password,
    );

    if (!userValidate) {
      throw new UnauthorizedException('Los datos no son válidos');
    }

    const jwt = await this.authService.generateJWT(userValidate);

    return {
      id: jwt.user.id,
      firstName: jwt.user.firstName,
      lastName: jwt.user.lastName,
      age: jwt.user.age,
      email: jwt.user.email,
      username: jwt.user.username,
      role: jwt.user.role,
      accessToken: jwt.accessToken,
    };
  }
}

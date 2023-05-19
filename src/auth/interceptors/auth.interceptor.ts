import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        const { accessToken, user } = response;
        return {
          accessToken,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          age: user.age,
          email: user.email,
          username: user.username,
          role: user.role,
        };
      }),
    );
  }
}

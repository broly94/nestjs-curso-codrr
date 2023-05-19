import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class CreateUsersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(
        ({ id, firstName, lastName, age, email, username, password, role }) => {
          return {
            id,
            firstName,
            lastName,
            age,
            email,
            username,
            password,
            role,
          };
        },
      ),
    );
  }
}

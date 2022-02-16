import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { catchError } from 'rxjs';
import { Observable } from 'rxjs';
import { Fail } from './response/custom.response';

@Injectable()
export class ExceptionInterCeptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('error is occured ');
    return next.handle().pipe(
      catchError(({ code, msg }) => {
        return of(new Fail(code, msg));
      }),
    );
  }
}

import {
    CallHandler,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const httpContext = context.switchToHttp();
        const response = httpContext.getResponse();

        return next.handle().pipe(
            map((data) => {
                const statusCode = response.statusCode || HttpStatus.OK;
                return {
                    statusCode: statusCode,
                    message: 'success',
                    data,
                };
            }),
            catchError((error) => {
                const response = httpContext.getResponse();
                const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
                const responseBody = error instanceof HttpException ? error.getResponse() : { message: 'Internal server error' };

                let message: string;
                if (typeof responseBody === 'string') {
                    message = responseBody;
                } else if (typeof responseBody === 'object' && 'message' in responseBody) {
                    message = (responseBody as { message: string }).message;
                } else {
                    message = 'An error occurred';
                }

                response.status(status).json({
                    statusCode: status,
                    message: message,
                });

                return throwError(() => error);
            }),
        );
    }
}

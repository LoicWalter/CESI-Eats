import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { ErrorsMessages } from 'libs/common';

@Catch(RpcException)
export class UnprocessableEntityExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException): Observable<any> {
    return throwError(() => {
      if (exception.getError() === ErrorsMessages.USER_ALREADY_EXISTS) {
        return { status: 422, message: exception.getError() };
      }
      if (exception.getError() === ErrorsMessages.RESTAURANT_NOT_FOUND) {
        return { status: 422, message: exception.getError() };
      }
      if (exception.getError() === ErrorsMessages.ITEM_NOT_FOUND) {
        return { status: 422, message: exception.getError() };
      }
      if (exception.getError() === ErrorsMessages.MENU_NOT_FOUND) {
        return { status: 422, message: exception.getError() };
      }
      if (exception.getError() === ErrorsMessages.USER_IS_NOT_OWNER) {
        return { status: 422, message: exception.getError() };
      }
      return exception.getError();
    });
  }
}

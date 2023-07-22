import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    let errorMessage;
                    if (err.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = { status: err.status, message: err.error };
                    } else {
                        switch (err.status) {
                            /*case 401: // redirect to login page
                                errorMessage = { 'status': err.status, 'message': err.error.message };
                                break;
                            case 403: // redirect to forbidden page
                                errorMessage = { 'status': err.status, 'message': err.error.message };
                                break;*/
                            case 500:
                                errorMessage = {
                                    status: err.status,
                                    message: 'Server Error occurred processing request'
                                };
                                break;
                            default:
                                // server-side error
                                errorMessage = { status: err.status, message: err.error.message };
                        }
                    }
                    return throwError(errorMessage);
                })
            );
    }
}

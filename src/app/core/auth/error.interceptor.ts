import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleErrorService } from './error.service';
import { AuthenticationService } from 'app/shared/services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private error: HandleErrorService, private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err) => {

            const error = this.error.handleError(err);

            if ([401].includes(err.status)) {
                // auto logout if 401 response returned from api
                this.authenticationService.signOut();
            }

            return throwError(error);
        }));
    }
}

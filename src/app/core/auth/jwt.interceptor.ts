import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { AuthenticationService } from 'app/shared/services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private _authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        this._authenticationService.getCurrentUser$.subscribe((user) => {
            const isLoggedIn = user && user.token;
            if (isLoggedIn) {
                request = request.clone({
                    setHeaders: { authorization: `Bearer ${user.token}` },
                });
            }
        });
        return next.handle(request);
    }
}

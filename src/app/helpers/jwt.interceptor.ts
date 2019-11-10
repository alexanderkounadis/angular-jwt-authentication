import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        if(currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    authorization: `Bearer ${currentUser.token}`
                }
            });
            
        }
        return next.handle(request);
    }
}
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';
import { environment } from 'src/app/environments/environments';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private accountService: UserAccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.accountService.userValue;
        const isLoggedIn = user?.token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `${user.token}`, 
                'Access-Control-Allow-Origin': `localhost:4200`}
            });
        } else {
            request = request.clone({
                setHeaders: { 'Access-Control-Allow-Origin': `localhost:4200`}
            });
        }

        return next.handle(request);
    }
}
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SetAjaxHeaderInterceptor implements HttpInterceptor {
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const ajaxRequest = request.clone({
            headers: request.headers.set('X-Requested-With', 'XMLHttpRequest')
        });
        return next.handle(ajaxRequest);
    }
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
/*
Перебирает тело запроса и конвертирует в ISO-представление все поля с типом Date
*/
@Injectable()
export class ConvertDatesToStringsInterceptor implements HttpInterceptor {
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request.body) {
            return next.handle(request);
        }
        const body = request.body;
        this.stringifyDateProperties(body);
        const newRequest = request.clone({
            body
        });
        return next.handle(newRequest);
    }
    private stringifyDateProperties(input: any): any {
        Object.keys(input).forEach(name => {
            const value = input[name];
            if (value === null || typeof value === 'undefined') {
                return;
            }
            if (value instanceof Date) {
                input[name] = value.toISOString();
            } else if (Array.isArray(value)) {
                value.forEach(item => {
                    this.stringifyDateProperties(item);
                });
            } else if (typeof value === 'object') {
                this.stringifyDateProperties(value);
            }
        });
    }
}

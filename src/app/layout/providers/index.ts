import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConvertDatesToStringsInterceptor } from './convert-dates-to-strings.interceptor';
import { SetAjaxHeaderInterceptor } from './set-ajax-header.interceptor';

// ВНИМАНИЕ!
// Порядок объявления интерцепторов влияет на порядок их вызова в цепочке обработки запроса.
// Менять порядок не рекомендуется, либо делать это только, если есть понимание на что это может повлиять.
export const APP_INTERCEPTORS = [
    { provide: HTTP_INTERCEPTORS, useClass: SetAjaxHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ConvertDatesToStringsInterceptor, multi: true }
];

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, UrlSerializer } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '@shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { CookieModule, CookieService } from 'ngx-cookie';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './layout/app/app.component';
import { APP_INTERCEPTORS } from './layout/providers';
import { I18N_PROVIDERS } from './layout/providers/i18n';
import { LowerCaseUrlSerializer } from './layout/providers/lower-case-url-serializer';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        CookieModule.forRoot(),
        HttpClientModule,
        RouterModule,
        SharedModule.forRoot(),
        I18NextModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        NgSelectModule
    ],
    providers: [
        I18N_PROVIDERS,
        CookieService,
        APP_INTERCEPTORS,
        {
            provide: UrlSerializer,
            useClass: LowerCaseUrlSerializer
        }
    ]
})
export class AppModule {}

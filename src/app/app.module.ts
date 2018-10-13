import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@shared/shared.module";
import { I18NextModule } from "angular-i18next";
import { AppRoutingModule } from "./app.routing.module";
import { AppComponent } from "./layout/app/app.component";
import { I18N_PROVIDERS } from "./layout/i18n";

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule,
        SharedModule.forRoot(),
        I18NextModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule
    ],
    providers: [I18N_PROVIDERS]
})
export class AppModule {}

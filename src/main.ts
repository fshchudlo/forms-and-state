import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { environment } from "@environment";
import { AppModule } from "./app/app.module";

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => {
        // tslint:disable-next-line:no-console
        console.log(err);
    });

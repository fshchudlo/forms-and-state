import { APP_INITIALIZER, LOCALE_ID } from "@angular/core";
import { I18NextModule, I18NextService } from "angular-i18next";
import * as i18nextXHRBackend from "i18next-xhr-backend";

const i18nextOptions = {
    backend: {
        loadPath: () => `/locales/{{ns}}.{{lng}}.json`
    },
    debug: false,
    fallbackLng: "ru",
    interpolation: {
        format: I18NextModule.interpolationFormat()
    },
    ns: ["shared"],
    whitelist: ["ru", "en"]
};

export function appFactory(i18NextService: I18NextService): () => Promise<any> {
    return () => {
        return i18NextService.use(i18nextXHRBackend).init(i18nextOptions);
    };
}

export function localeFactory(i18next: I18NextService): string {
    return i18next.language;
}

export const I18N_PROVIDERS = [
    {
        deps: [I18NextService],
        multi: true,
        provide: APP_INITIALIZER,
        useFactory: appFactory
    },
    {
        deps: [I18NextService],
        provide: LOCALE_ID,
        useFactory: localeFactory
    }
];

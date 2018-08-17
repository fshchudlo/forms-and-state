import { APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { I18NextModule, I18NextService } from 'angular-i18next';
import * as i18nextXHRBackend from 'i18next-xhr-backend';
import { CookieService } from 'ngx-cookie';

const i18nextOptions = {
    backend: {
        loadPath: () => `/dist/locales/{{ns}}.{{lng}}.json`
    },
    debug: false,
    fallbackLng: 'ru',
    interpolation: {
        format: I18NextModule.interpolationFormat()
    },
    ns: ['shared'],
    whitelist: ['ru', 'en']
};

class LanguageDetector {
    public type: string = 'languageDetector';

    constructor(private cookieService: CookieService) {}

    public init(): void {
        return;
    }

    public detect(): string {
        const lang = this.cookieService.get('lcid') || '1049';
        return lang === '1049' ? 'ru' : 'en';
    }

    public cacheUserLanguage(lang: string): void {
        this.cookieService.put('lcid', lang === 'ru' ? '1049' : '1033', { path: '/' });
    }
}

export function appFactory(i18NextService: I18NextService, cookieService: CookieService): () => Promise<any> {
    return () => {
        return i18NextService
            .use(i18nextXHRBackend)
            .use(<any>new LanguageDetector(cookieService))
            .init(i18nextOptions);
    };
}

export function localeFactory(i18next: I18NextService): string {
    return i18next.language;
}

export const I18N_PROVIDERS = [
    {
        deps: [I18NextService, CookieService],
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

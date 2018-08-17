import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OnPushControlValueAccessor } from '@core';
import { I18NextService } from 'angular-i18next';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            multi: true,
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SiteAudienceComponent)
        }
    ],
    selector: 'site-audience',
    templateUrl: 'site-audience.component.html'
})
export class SiteAudienceComponent extends OnPushControlValueAccessor<Backend.LookupValue> {
    public audienceTypes: Backend.LookupValue[] = [
        {
            id: `Tourists`,
            text: this.i18next.t(`my-form:siteAudience.tourists`)
        },
        {
            id: `Customers`,
            text: this.i18next.t(`my-form:siteAudience.customers`)
        },
        {
            id: `Subagents`,
            text: this.i18next.t(`my-form:siteAudience.subagents`)
        }
    ];
    constructor(private i18next: I18NextService, changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef);
    }
}

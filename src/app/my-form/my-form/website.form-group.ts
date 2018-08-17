import { FormControl, Validators } from '@angular/forms';
import { TypedFormGroup } from '@core';
import { distinctUntilChanged, filter } from 'rxjs/operators';

export class WebsiteSettingsFormGroup extends TypedFormGroup<Backend.WebsiteModel> {
    constructor(state: Backend.WebsiteModel) {
        const requiredWith128Length = Validators.compose([Validators.required, Validators.maxLength(128)]);
        const controls = {
            bindedCity: new FormControl(state.bindedCity, Validators.required),
            siteAudience: new FormControl(state.siteAudience, Validators.required),
            siteUrl: new FormControl(state.siteUrl, requiredWith128Length),
            testUserLogin: new FormControl(state.testUserLogin, requiredWith128Length),
            testUserPassword: new FormControl(state.testUserPassword, requiredWith128Length),
            websiteRequiresRegistrationForTesting: new FormControl(state.websiteRequiresRegistrationForTesting)
        };

        controls.websiteRequiresRegistrationForTesting.valueChanges
            .pipe(
                distinctUntilChanged(),
                filter(() => controls.siteUrl.parent.enabled)
            )
            .subscribe((value: boolean) => {
                if (value) {
                    controls.testUserLogin.setValidators([Validators.required, Validators.maxLength(128)]);
                    controls.testUserPassword.setValidators([Validators.required, Validators.maxLength(128)]);
                } else {
                    controls.testUserLogin.clearValidators();
                    controls.testUserLogin.setValue(null);

                    controls.testUserPassword.clearValidators();
                    controls.testUserPassword.setValue(null);
                }
            });

        super(controls);
    }
}

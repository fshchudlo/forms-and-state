import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators, TypedFormGroup } from '@core';

export class TechnicalContactSettingsFormGroup extends TypedFormGroup<Backend.TechnicalContactModel> {
    constructor(model: Backend.TechnicalContactModel) {
        const nameValidator = Validators.compose([Validators.required, Validators.pattern('[-—A-Za-zА-Яа-яЁё]+'), Validators.maxLength(128)]);

        const controls = {
            email: new FormControl(model.email, [Validators.required, CustomValidators.email, Validators.maxLength(128)]),
            firstName: new FormControl(model.firstName, nameValidator),
            lastName: new FormControl(model.lastName, nameValidator),
            middleName: new FormControl(model.middleName, nameValidator),
            phone: new FormGroup({
                country: new FormControl(model.phone.country, [Validators.required]),
                number: new FormControl(model.phone.number, [Validators.required, Validators.maxLength(16), Validators.pattern('[0-9]+')])
            }),
            position: new FormControl(model.position, [Validators.required]),
            sex: new FormControl(model.sex, [Validators.required])
        };

        super(controls);
    }
}

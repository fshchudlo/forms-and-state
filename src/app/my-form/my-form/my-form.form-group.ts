import { FormControl, Validators } from '@angular/forms';
import { TypedFormGroup } from '@core';
import { SaleTypeInfoFormGroup } from '../sale-type-info/sale-type-info.form-group';
import { TechnicalContactSettingsFormGroup } from '../technical-contact-settings/technical-contact-settings.form-group';
import { WebsiteSettingsFormGroup } from './website.form-group';

export class MyFormFormGroup extends TypedFormGroup<Backend.EditMyFormModel> {
    constructor(state: Backend.MyFormState) {
        const model: Backend.EditMyFormModel = {
            id: state.id,
            rowVersion: state.rowVersion,
            saleTypeInfo: state.saleTypeInfo,
            technicalContactSettings: state.technicalContactSettings,
            text: state.text,
            website: state.website,
            websiteDevelopersInfo: state.websiteDevelopersInfo
        };

        const controls = {
            id: new FormControl(model.id),
            rowVersion: new FormControl(model.rowVersion),
            saleTypeInfo: new SaleTypeInfoFormGroup(model.saleTypeInfo),
            technicalContactSettings: new TechnicalContactSettingsFormGroup(model.technicalContactSettings),
            text: new FormControl(model.text, Validators.maxLength(4000)),
            website: new WebsiteSettingsFormGroup(model.website)
        };

        super(controls);
    }
}

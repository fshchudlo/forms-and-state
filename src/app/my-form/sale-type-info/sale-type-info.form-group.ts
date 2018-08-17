import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { TypedFormGroup, updateFormValueAndValidity } from '@core';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { isSubagent, SaleType } from './enums';

export class SaleTypeInfoFormGroup extends TypedFormGroup<Backend.SaleTypeModel> {
    constructor(state: Backend.SaleTypeModel) {
        const controls = {
            saleType: new FormControl(state.saleType),
            subagentName: new FormControl(state.subagentName),
            subagentOwnershipForm: new FormControl(state.subagentOwnershipForm),
            subagentTin: new FormControl(state.subagentTin)
        };
        controls.saleType.valueChanges
            .pipe(
                distinctUntilChanged(),
                filter(() => controls.saleType.parent.enabled)
            )
            .subscribe((type: SaleType) => {
                if (isSubagent(type)) {
                    controls.subagentTin.setValidators([Validators.required, SaleTypeInfoFormGroup.tinValidator()]);
                } else {
                    controls.subagentTin.clearValidators();
                    controls.subagentTin.clearAsyncValidators();
                    controls.subagentTin.setValue(null);
                    controls.subagentOwnershipForm.setValue(null);
                    controls.subagentName.setValue(null);
                }
                updateFormValueAndValidity(controls.subagentTin.parent);
            });

        super(controls);
    }
    private static tinValidator: () => ValidatorFn = () => {
        return (control: AbstractControl) => {
            const regexp = /^\d{10}(\d\d)?$/g;
            if (!!control.value && !regexp.test(control.value)) {
                return { tin: true };
            }
            return null;
        };
    };
}

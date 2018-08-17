import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';

export class TypedFormGroup<T> extends FormGroup {
    public readonly value: T;
    constructor(
        controls: {
            [key: string]: AbstractControl;
        },
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {
        super(controls, validatorOrOpts, asyncValidator);
    }
    public getRawValue(): T {
        return super.getRawValue();
    }
    public setValue(value: T): void {
        super.setValue(value);
    }
}

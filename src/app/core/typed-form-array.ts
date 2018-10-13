import {
    AbstractControlOptions,
    AsyncValidatorFn,
    FormArray,
    ValidatorFn
} from "@angular/forms";
import { TypedFormGroup } from "@core";

export class TypedFormArray<T> extends FormArray {
    public readonly value: T;

    constructor(
        controls: Array<TypedFormGroup<T>>,
        validatorOrOpts?:
            | ValidatorFn
            | ValidatorFn[]
            | AbstractControlOptions
            | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {
        super(controls, validatorOrOpts, asyncValidator);
    }

    public getRawValue(): T[] {
        return super.getRawValue();
    }

    public setValue(value: T[]): void {
        super.setValue(value);
    }

    public removeAt(index: number): void {
        super.removeAt(index);
        this.markAsDirty();
    }

    public appendFormGroup(formGroup: TypedFormGroup<T>): void {
        if (this.disabled) {
            formGroup.disable();
        }
        this.push(formGroup);
        this.markAsDirty();
    }
}

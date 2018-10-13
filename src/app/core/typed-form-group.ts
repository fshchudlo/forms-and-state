import { AbstractControl, FormArray, FormGroup } from "@angular/forms";
// tslint:disable-next-line:ban-types - shared-функция, здесь можно
function markFormAsDirty(group: FormGroup | FormArray): void {
    const controls = group.controls;
    for (const ck in controls) {
        if (controls.hasOwnProperty(ck)) {
            const c: AbstractControl = controls[ck];
            if (c instanceof FormGroup || c instanceof FormArray) {
                markFormAsDirty(c);
            }
            c.markAsDirty();
        }
    }
    group.markAsDirty();
}

// tslint:disable-next-line:ban-types - shared-функция, здесь можно
function updateFormValueAndValidity(group: FormGroup | FormArray): void {
    const controls = group.controls;
    for (const ck in controls) {
        if (controls.hasOwnProperty(ck)) {
            const c: AbstractControl = controls[ck];
            if (c instanceof FormGroup || c instanceof FormArray) {
                updateFormValueAndValidity(c);
            }
            c.updateValueAndValidity();
        }
    }
    group.updateValueAndValidity();
}
export abstract class TypedFormGroup<T> extends FormGroup {
    public readonly value: T;
    public getRawValue(): T {
        return super.getRawValue();
    }
    public setValue(value: T): void {
        super.setValue(value);
    }
    /**
     *  Рекурсивно вызывает updateFormValueAndValidity на всех контролах в форме
     * https://github.com/angular/angular/issues/6170
     */
    public updateEntireFormValueAndValidity(): void {
        updateFormValueAndValidity(this);
    }
    /**
     * Рекурсивно помечает все контролы в форме как dirty
     * https://github.com/angular/angular/issues/6170
     */
    public markEntireFormAsDirty(): void {
        markFormAsDirty(this);
    }
}

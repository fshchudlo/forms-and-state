import { AbstractControl, FormArray, FormGroup } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";

function getAllControlErrors(
    // tslint:disable-next-line:ban-types - shared-функция, здесь можно
    control: AbstractControl
): any {
    let resultedErrors: any = control.errors
        ? { errors: control.errors }
        : null;
    if (control instanceof FormGroup || control instanceof FormArray) {
        for (const ck in control.controls) {
            if (!control.controls.hasOwnProperty(ck)) {
                continue;
            }
            const childErrors = getAllControlErrors(control.controls[ck]);
            if (childErrors) {
                resultedErrors = resultedErrors ? resultedErrors : {};
                resultedErrors[ck] = childErrors;
            }
        }
    }
    return resultedErrors;
}
function getAllEnabledControls(
    // tslint:disable-next-line:ban-types - shared-функция, здесь можно
    control: AbstractControl
): any {
    let resultedControls: any = control.enabled
        ? { enabled: control.enabled }
        : null;
    if (control instanceof FormGroup || control instanceof FormArray) {
        for (const ck in control.controls) {
            if (!control.controls.hasOwnProperty(ck)) {
                continue;
            }
            const enabledControls = getAllEnabledControls(control.controls[ck]);
            if (enabledControls) {
                resultedControls = resultedControls ? resultedControls : {};
                resultedControls[ck] = enabledControls;
            }
        }
    }
    return resultedControls;
}
export class TypedFormGroup<T> extends FormGroup {
    /**
     *  Признак, указывающий что пользователь делал поптыку отправить данную форму
     */
    public readonly submitAttemptWasMade: Observable<
        boolean
    > = new BehaviorSubject<boolean>(false);
    public readonly value: T;
    public valueChanges: Observable<T>;
    /**
     *  Если формы pristine, то прогоняет updateEntireFormValueAndValidity после чего публикует значение в submitAttemptWasMade
     */
    public markAsAttemptedToSubmit(): void {
        this.updateValueAndValidity();
        (<BehaviorSubject<boolean>>this.submitAttemptWasMade).next(true);
    }
    public reset(
        value?: any,
        options?: {
            onlySelf?: boolean;
            emitEvent?: boolean;
        }
    ): void {
        (<BehaviorSubject<boolean>>this.submitAttemptWasMade).next(false);
        super.reset(value, options);
    }
    public getRawValue(): T {
        return super.getRawValue();
    }
    public disable(opts?: { onlySelf?: boolean; emitEvent?: boolean }): void {
        super.disable(opts);
        if (!this.disabled) {
            // tslint:disable-next-line:no-console
            console.error("Form wasn't disabled");
            // tslint:disable-next-line:no-console
            console.error(getAllEnabledControls(this));
        }
    }
    public getAllErrors(): T {
        return getAllControlErrors(this);
    }
    public setValue(
        value: T,
        options?: {
            onlySelf?: boolean;
            emitEvent?: boolean;
        }
    ): void {
        super.setValue(value, options);
    }
}

import { HttpErrorResponse } from "@angular/common/http";
import { AbstractControl, FormArray, FormGroup } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";

interface ServerValidationError {
    propertyName: string;
    errorMessage: string;
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
    public resetSubmitState(): void {
        (<BehaviorSubject<boolean>>this.submitAttemptWasMade).next(false);
        if (
            this.root &&
            this.root instanceof TypedFormGroup &&
            this.root !== this
        ) {
            this.root.resetSubmitState();
        }
    }
    public reset(
        value?: T | null,
        options?: {
            onlySelf?: boolean;
            emitEvent?: boolean;
        }
    ): void {
        this.resetSubmitState();
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
        return getAllErrors(this);
    }
    public applyServerErrorsOrThrow(error: HttpErrorResponse): void {
        if (!isServerValidationError(error)) {
            throw error;
        }
        const serverErrors = error.error as ServerValidationError[];

        serverErrors.forEach(validationError => {
            const propertyName = validationError.propertyName;
            const allErrors = serverErrors
                .filter(
                    serverError => serverError.propertyName === propertyName
                )
                .map(serverError => serverError.errorMessage);
            const formControl = findControlByFieldName(this, propertyName);
            formControl.setErrors({ serverErrors: allErrors });
        });
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
function isServerValidationError(error: HttpErrorResponse): boolean {
    return error && error.status === 400;
}
function getAllErrors(
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
            const childErrors = getAllErrors(control.controls[ck]);
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

function findControlByFieldName(
    form: TypedFormGroup<any>,
    fieldName: string
): AbstractControl {
    if (fieldName === "") {
        return form;
    }
    const normalizedFieldName = getCamelCasedName(fieldName);

    let control = form.get(normalizedFieldName.replace(/(\[|\]\.|\])/g, "."));

    // Если контрол disabled, то валидация на нем не нарисуется. Перекидываем сообщения на уровень выше
    if (control && control.disabled) {
        while (control.disabled && control !== control.root) {
            control = control.parent;
        }
    }

    return control || form;
}
const camelCasePropertiesNamesRegex: RegExp = /(^[A-Z]{1,}|\.[A-Z]{1,})/g;
function getCamelCasedName(fieldName: string): string {
    return fieldName.replace(
        camelCasePropertiesNamesRegex,
        (match: string): string => {
            // Если длина вхождения больше 1, то свойство начинается с аббревиатуры.
            // В таких полях опускаем в lower case все символы, кроме последнего, как начала следующего слова
            return match.replace(".", "").length === 1
                ? match.toLowerCase()
                : `${match.substring(0, match.length - 1).toLowerCase()}${
                      match[match.length - 1]
                  }`;
        }
    );
}

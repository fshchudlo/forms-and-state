import { HttpErrorResponse } from "@angular/common/http";
import { AbstractControl } from "@angular/forms";
import { TypedFormGroup } from "@core";

interface ServerValidationError {
    propertyName: string;
    errorMessage: string;
}
const camelCasePropertiesNamesRegex: RegExp = /(^[A-Z]{1,}|\.[A-Z]{1,})/g;

export class ServerValidationHelper {
    public static isServerValidationError(error: HttpErrorResponse): boolean {
        return error && error.status === 400;
    }
    public static parseValidationErrorOrThrow(
        error: HttpErrorResponse,
        form: TypedFormGroup<any>
    ): void {
        if (!ServerValidationHelper.isServerValidationError(error)) {
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

            const formControl = this.findFieldControl(form, propertyName);
            formControl.setErrors({ serverErrors: allErrors });
        });
    }
    private static findFieldControl(
        form: TypedFormGroup<any>,
        fieldName: string
    ): AbstractControl {
        if (fieldName === "") {
            return form;
        }
        // Опускаем имя в camel case
        const normalizedFieldName = fieldName.replace(
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
        let control: AbstractControl =
            normalizedFieldName.indexOf("[") !== -1
                ? form.get(
                      normalizedFieldName
                          .split(/\[|\]|\./)
                          .filter(item => item !== "")
                  )
                : form.get(normalizedFieldName);
        if (!control) {
            // Контрол не найден, но ошибка валидации есть, поэтому используем рутовый контрол
            control = form;
        }
        return control;
    }
}

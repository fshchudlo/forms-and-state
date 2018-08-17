import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {
    public static maxValue(max: number): ValidatorFn {
        return (control: AbstractControl): { maxValue: any } => {
            const input = control.value;
            if (!isNaN(input) && input > max) {
                return { maxValue: { maxValue: max } };
            } else {
                return null;
            }
        };
    }
    public static minValue(min: number): ValidatorFn {
        return (control: AbstractControl): { minValue: any } => {
            const input = control.value;
            if (!isNaN(input) && input < min) {
                return { minValue: { minValue: min } };
            } else {
                return null;
            }
        };
    }

    public static get email(): ValidatorFn {
        // tslint:disable-next-line:max-line-length
        const regex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-||_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+([a-z]+|\d|-|\.{0,1}|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])?([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/;
        return (control: AbstractControl) => {
            if (!!control.value && (control.value.length <= 5 || !regex.test(control.value))) {
                return { email: true };
            }
            return null;
        };
    }
    public static exactLength: (requiredLength: number) => ValidatorFn = (targetLength: number) => {
        return (control: AbstractControl): any => {
            if (control.dirty && !!control.value && String(control.value).length !== targetLength) {
                return { exactLength: { requiredLength: targetLength } };
            }
            return null;
        };
    };
}

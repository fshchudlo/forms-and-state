import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

/*
 Рекурсивно помечает все контролы в форме как dirty
 https://github.com/angular/angular/issues/6170
*/
export function markFormAsDirty(group: FormGroup | FormArray): void {
    group.markAsDirty();
    const controls = group.controls;
    for (const ck in controls) {
        if (controls.hasOwnProperty(ck)) {
            const c: AbstractControl = controls[ck];
            c.markAsDirty();
            if (c instanceof FormGroup || c instanceof FormArray) {
                markFormAsDirty(c);
            }
        }
    }
}

/* Рекурсивно вызывает updateFormValueAndValidity на всех контролах в форме
   https://github.com/angular/angular/issues/6170
*/
export function updateFormValueAndValidity(group: FormGroup | FormArray): void {
    group.updateValueAndValidity();
    const controls = group.controls;
    for (const ck in controls) {
        if (controls.hasOwnProperty(ck)) {
            const c: AbstractControl = controls[ck];
            c.updateValueAndValidity();
            if (c instanceof FormGroup || c instanceof FormArray) {
                updateFormValueAndValidity(c);
            }
        }
    }
}
export function getFormControlPath(control: AbstractControl): string | null {
    let controlName = null;
    const parent = control.parent;
    if (parent instanceof FormGroup) {
        Object.keys(parent.controls).forEach(name => {
            if (control === parent.controls[name]) {
                controlName = name;
            }
        });
    }
    if (parent instanceof FormArray) {
        Object.keys(parent.controls).forEach(name => {
            if (control === parent.controls[name]) {
                controlName = `[${name}]`;
            }
        });
    }
    if (parent && parent.parent) {
        const parentName = getFormControlPath(parent);
        if (parentName) {
            controlName = `${parentName}.${controlName}`;
        }
    }
    return controlName;
}
export function scrollToFirstInvalidControl(): void {
    setTimeout(() => {
        /*
        выставляем таймаут, чтобы появилось сообщение валидации
         */
        const errorControl = document.querySelector('.form-error');
        if (errorControl !== null) {
            const offsetFromControlWithError = 70;
            const y = errorControl.getBoundingClientRect().top;
            const docScrollTop = document.documentElement.scrollTop;
            window.scroll({ left: 0, top: docScrollTop + y - offsetFromControlWithError, behavior: 'smooth' });
        }
    }, 0);
}

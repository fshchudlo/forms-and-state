import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChange,
    ViewEncapsulation
} from "@angular/core";
import { AbstractControl, FormArray, FormGroup } from "@angular/forms";
import { I18NEXT_NAMESPACE, I18NextService } from "angular-i18next";
import { Subscription } from "rxjs";
import { startWith } from "rxjs/operators";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // tslint:disable-next-line:use-view-encapsulation
    encapsulation: ViewEncapsulation.None,
    exportAs: "validationError",
    selector: "validation-error",
    styleUrls: ["validation-error.component.scss"],
    template: `
    <ng-template ngFor let-error [ngForOf]="validationMessages">
        <div class="form-error" [innerHTML]="error"></div>
    </ng-template>
  `
})
export class ValidationErrorComponent implements OnChanges, OnDestroy {
    @Input()
    public for: AbstractControl = null;
    public validationMessages: string[] = [];
    private statusSubscription: Subscription;
    private formControlPath: string;

    constructor(
        @Inject(I18NEXT_NAMESPACE) private i18nextNamespace: string,
        private i18next: I18NextService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    public ngOnDestroy(): void {
        if (this.statusSubscription) {
            this.statusSubscription.unsubscribe();
        }
    }
    public ngOnChanges(changes: { for?: SimpleChange }): void {
        if (changes.for) {
            this.bindControlListener();
        }
    }
    public bindControlListener(): void {
        if (this.statusSubscription) {
            this.statusSubscription.unsubscribe();
        }
        if (this.for) {
            this.statusSubscription = this.for.statusChanges
                .pipe(startWith(this.for.status))
                .subscribe(() => {
                    this.buildValidationMessages();
                });
        }
    }
    private buildValidationMessages(): void {
        this.validationMessages = [];
        if (
            this.for == null ||
            this.for.status !== "INVALID" ||
            this.for.errors == null
        ) {
            this.changeDetectorRef.markForCheck();
            return;
        }
        const errorsArray: any = this.for.errors;
        for (const key of Object.keys(this.for.errors)) {
            this.appendValidationMessagesFor(errorsArray, key);
        }
        this.changeDetectorRef.markForCheck();
    }

    private appendValidationMessagesFor(errorsArray: any, key: string): void {
        const value = errorsArray[key];
        let params = null;
        if (value instanceof Object) {
            params = value;
        } else if (value !== true) {
            params = {};
            params[key] = value;
        }
        if (key === "serverErrors") {
            // С сервера может прийти множество сообщений под одним ключом. Разделяем их
            (Array.isArray(params) ? params : [params]).forEach(message => {
                this.validationMessages.push(
                    this.getLocalizedValidationMessage(key, message)
                );
            });
        } else {
            this.formControlPath =
                this.formControlPath || getFormControlPath(this.for);
            this.validationMessages.push(
                this.getLocalizedValidationMessage(
                    key,
                    params,
                    this.formControlPath
                )
            );
        }
    }
    private getLocalizedValidationMessage(
        errorKey: string,
        params: any,
        controlPath?: string
    ): string {
        if (isMessageFromBackend(errorKey)) {
            return params;
        }

        let messageKeys = [];
        if (errorHasOwnMessage(params)) {
            messageKeys = getI18NextMessageKeys(
                params.message,
                this.i18nextNamespace
            );
            messageKeys.push(params.message);
        } else {
            messageKeys = getI18NextMessageKeys(
                errorKey,
                this.i18nextNamespace
            );
            if (controlPath) {
                messageKeys.unshift(
                    `${
                        this.i18nextNamespace
                    }:validation.${controlPath}.${errorKey}`
                );
            }
        }
        return this.i18next.t(messageKeys, params);
    }
}

const SHARED_VALIDATION_NAMESPACE = "shared:validation.";

function getI18NextMessageKeys(
    errorKey: string,
    featureNamespace: string
): string[] {
    return [
        `${featureNamespace}:validation.${errorKey}`,
        `${SHARED_VALIDATION_NAMESPACE}${errorKey}`
    ];
}

function errorHasOwnMessage(params: any): boolean {
    return params && params.message;
}

function isMessageFromBackend(errorKey: string): boolean {
    return errorKey === "serverErrors";
}

function getFormControlPath(control: AbstractControl): string | null {
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

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { getFormControlPath } from '@core';
import { I18NEXT_NAMESPACE, I18NextService } from 'angular-i18next';
import { Subscription } from 'rxjs';
import { ValidationMessageModel } from './validation-message.model';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // tslint:disable-next-line:use-view-encapsulation
    encapsulation: ViewEncapsulation.None,
    exportAs: 'validationError',
    selector: 'validation-error',
    styleUrls: ['validation-error.component.scss'],
    template: `
    <ng-template ngFor let-error [ngForOf]="validationMessages">
        <div class="form-error" [innerHTML]="error.message"></div>
    </ng-template>
  `
})
export class ValidationErrorComponent implements OnInit, OnDestroy {
    @Input()
    public for: AbstractControl = null;
    public validationMessages: ValidationMessageModel[] = [];
    private statusSubscription: Subscription;
    private formControlPath: string;

    constructor(@Inject(I18NEXT_NAMESPACE) private i18nextNamespace: string, private i18next: I18NextService, private changeDetectorRef: ChangeDetectorRef) {}

    public ngOnDestroy(): void {
        if (this.statusSubscription) {
            this.statusSubscription.unsubscribe();
        }
    }
    public ngOnInit(): void {
        if (this.for) {
            this.buildValidationMessages();
            this.statusSubscription = this.for.statusChanges.subscribe(() => {
                this.buildValidationMessages();
            });
        }
    }
    private buildValidationMessages(): void {
        // markForCheck используем вместо события, поскольку нам нужно, чтобы проверка прошла от самого root вплоть до текущего компонента.
        // Так же это дешевле, чем бросать event, посколько события за один цикл работы с формой могут выбрасываться хоть по 10 раз
        this.validationMessages = [];
        if (this.for == null || this.for.status !== 'INVALID' || this.for.errors == null) {
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
        if (key === 'serverErrors') {
            // С сервера может прийти множество сообщений под одним ключом. Разделяем их
            (Array.isArray(params) ? params : [params]).forEach(message => {
                this.validationMessages.push(new ValidationMessageModel(this.i18next, key, message, this.i18nextNamespace));
            });
        } else {
            this.formControlPath = this.formControlPath || getFormControlPath(this.for);
            this.validationMessages.push(new ValidationMessageModel(this.i18next, key, params, this.i18nextNamespace, this.formControlPath));
        }
    }
}

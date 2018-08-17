import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { markFormAsDirty, scrollToFirstInvalidControl, ServerValidationHelper, updateFormValueAndValidity } from '@core';
import { RoutingConfig } from '@routing.config';
import { EMPTY, Observable } from 'rxjs';
import { catchError, skipWhile, take } from 'rxjs/operators';
import { MyFormService } from '../my-form.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'submit-request-button',
    templateUrl: 'submit-request-button.component.html'
})
export class SubmitRequestButtonComponent {
    @Input()
    public requestState: Backend.MyFormState;
    @Input()
    public form: FormGroup;
    @Output()
    public readonly pending: EventEmitter<boolean> = new EventEmitter();
    public buttonTitle: string = 'shared:buttons.send';
    constructor(private router: Router, private myFormService: MyFormService) {}

    public validateAndSubmitRequest(): void {
        this.pending.emit(true);
        // Помечаем всю форму как dirty, чтобы зафорсить отображение сообщений валидации
        markFormAsDirty(this.form);
        updateFormValueAndValidity(this.form);
        // Если на форме есть асинхронные валидаторы, ждем их завершения
        if (this.form.pending) {
            this.form.statusChanges
                .pipe(
                    skipWhile(() => this.form.pending),
                    take(1)
                )
                .subscribe(() => {
                    this.checkFormStateAndSendRequest();
                });
        } else {
            this.checkFormStateAndSendRequest();
        }
    }
    private checkFormStateAndSendRequest(): void {
        this.pending.emit(false);
        // Когда форма disabled, то invalid: false и valid: false. https://github.com/angular/angular/issues/18678
        if (this.form.invalid) {
            scrollToFirstInvalidControl();
            return;
        }
        const request = this.sendRequest();
        request
            .pipe(
                catchError((error: any) => {
                    return this.handleSubmitFailure(error);
                })
            )
            .subscribe((response: any) => {
                this.handleSubmitSuccess(response);
            });
    }

    private sendRequest(): Observable<any> {
        return this.requestState.id ? this.myFormService.put(this.form) : this.myFormService.post(this.form);
    }

    private handleSubmitFailure(error: HttpErrorResponse): Observable<any> {
        ServerValidationHelper.parseValidationErrorOrThrow(error, this.form);
        scrollToFirstInvalidControl();
        return EMPTY;
    }

    private handleSubmitSuccess(response: any): void {
        this.reloadRequestPage(response);
        return;
    }

    private reloadRequestPage(response: any): void {
        this.router.navigate([RoutingConfig.MyForm.View, response.id]);
    }
}

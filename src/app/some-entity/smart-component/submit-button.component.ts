import { HttpErrorResponse } from "@angular/common/http";
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from "@angular/core";
import { ServerValidationHelper, TypedFormGroup } from "@core";
import { EMPTY, Observable, Subject } from "rxjs";
import { catchError, skipWhile, startWith, take } from "rxjs/operators";
import { SomeEntityService } from "../some-entity.service";

export function scrollToFirstInvalidControl(): void {
    const errorControl = document.querySelector(".form-error");
    if (errorControl !== null) {
        const offsetFromControlWithError = 70;
        const y = errorControl.getBoundingClientRect().top;
        const docScrollTop = document.documentElement.scrollTop;
        window.scroll({
            behavior: "smooth",
            left: 0,
            top: docScrollTop + y - offsetFromControlWithError
        });
    }
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "submit-button",
    templateUrl: "submit-button.component.html"
})
export class SubmitButtonComponent {
    @Input()
    public form: TypedFormGroup<Backend.SomeEntityModel>;
    @Output()
    public readonly formSaved: EventEmitter<boolean> = new EventEmitter();
    public readonly pending: Subject<boolean> = new Subject();
    constructor(private someEntityService: SomeEntityService) {}

    public validateAndSubmitRequest(): void {
        this.pending.next(true);
        // Mark entire form as dirty to force validation messages displaying
        this.form.markEntireFormAsDirty();
        this.form.updateEntireFormValueAndValidity();

        // Wait for async form validators if any
        this.form.statusChanges
            .pipe(
                startWith(this.form.status),
                skipWhile(() => this.form.pending),
                take(1)
            )
            .subscribe(() => {
                this.checkFormStateAndSendRequest();
            });
    }
    private checkFormStateAndSendRequest(): void {
        this.pending.next(false);
        if (this.form.invalid) {
            // Using setTimeout to wait while while render cycle is performed and validation messages becomes visible
            setTimeout(() => {
                scrollToFirstInvalidControl();
            }, 0);
            return;
        }
        this.someEntityService
            .post(this.form)
            .pipe(
                take(1),
                catchError((error: any) => {
                    return this.handleSubmitFailure(error);
                })
            )
            .subscribe(() => {
                this.handleSubmitSuccess();
            });
    }

    private handleSubmitFailure(error: HttpErrorResponse): Observable<any> {
        ServerValidationHelper.parseValidationErrorOrThrow(error, this.form);
        scrollToFirstInvalidControl();
        return EMPTY;
    }

    private handleSubmitSuccess(): void {
        this.formSaved.emit();
    }
}

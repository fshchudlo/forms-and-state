import {
    Directive,
    DoCheck,
    ElementRef,
    OnDestroy,
    OnInit,
    Renderer2
} from "@angular/core";
import { FormGroup, FormGroupDirective } from "@angular/forms";
import { TypedFormGroup } from "@core";
import { Subscription } from "rxjs";

const submittedFormClassName = "ng-attempted-to-submit";

@Directive({
    selector: "form[formGroup]"
})
export class MarkFormAsSubmittedDirective
    implements OnInit, DoCheck, OnDestroy {
    private lastFormGroup: TypedFormGroup<any> = null;
    private submitAttemptWasMadeSubscription: Subscription = null;
    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private formGroupDirective: FormGroupDirective
    ) {}
    public ngDoCheck(): void {
        if (this.lastFormGroup) {
            const control = this.formGroupDirective
                ? this.formGroupDirective.control
                : null;
            if (this.lastFormGroup !== control) {
                this.bindListener(control);
            }
        }
    }
    public ngOnInit(): void {
        if (
            this.formGroupDirective.control &&
            this.formGroupDirective.control instanceof TypedFormGroup
        ) {
            this.bindListener(this.formGroupDirective.control);
        }
    }
    public ngOnDestroy(): void {
        if (this.submitAttemptWasMadeSubscription) {
            this.submitAttemptWasMadeSubscription.unsubscribe();
        }
    }
    // tslint:disable-next-line:ban-types
    private bindListener(formGroup: FormGroup | null): void {
        if (this.submitAttemptWasMadeSubscription) {
            this.submitAttemptWasMadeSubscription.unsubscribe();
        }
        if (formGroup && formGroup instanceof TypedFormGroup) {
            this.lastFormGroup = formGroup;
            this.submitAttemptWasMadeSubscription = this.lastFormGroup.submitAttemptWasMade.subscribe(
                value => {
                    if (value) {
                        this.renderer.addClass(
                            this.elementRef.nativeElement,
                            submittedFormClassName
                        );
                    } else {
                        this.renderer.removeClass(
                            this.elementRef.nativeElement,
                            submittedFormClassName
                        );
                    }
                }
            );
        }
    }
}

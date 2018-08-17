import { AfterViewInit, Directive, OnDestroy, Optional, Renderer2, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormControlName, FormGroupName } from '@angular/forms';
import { Subscription } from 'rxjs';
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[formControlName]'
})
export class RenderRequiredStarDirective implements AfterViewInit, OnDestroy {
    private controlSubscription: Subscription;
    private labelElement: Element = undefined;
    private labelSelectorToMatch: string = 'label.form-label';
    private formGroupSelector: string = '.form-group';
    private requiredClassName: string = 'form-label-req';
    private control: AbstractControl;
    private latestRequiredState: boolean = false;
    constructor(
        private renderer: Renderer2,
        private viewContainer: ViewContainerRef,
        @Optional() private formControlName: FormControlName,
        @Optional() private formGroupName: FormGroupName
    ) {}

    public ngOnDestroy(): void {
        if (this.controlSubscription) {
            this.controlSubscription.unsubscribe();
        }
    }
    public ngAfterViewInit(): void {
        this.control = (this.formControlName || this.formGroupName).control;
        this.controlSubscription = this.control.statusChanges.subscribe(() => {
            this.checkControlIsRequired();
        });
        this.checkControlIsRequired();
    }
    private checkControlIsRequired(): void {
        const validatorResult = this.control.validator && this.control.validator({} as AbstractControl);
        const hasRequiredValidator = !!validatorResult && validatorResult.required;
        this.setupRequiredClass(hasRequiredValidator);
    }

    private setupRequiredClass(hasRequiredValidator: boolean): void {
        this.findElementLabel();
        if (!this.labelElement || this.latestRequiredState === hasRequiredValidator) {
            return;
        }
        this.latestRequiredState = hasRequiredValidator;
        if (this.latestRequiredState) {
            this.renderer.addClass(this.labelElement, this.requiredClassName);
        } else {
            this.renderer.removeClass(this.labelElement, this.requiredClassName);
        }
    }

    private findElementLabel(): void {
        if (typeof this.labelElement === 'undefined') {
            const possibleLabel = (<Element>this.viewContainer.element.nativeElement).previousElementSibling;
            this.labelElement = possibleLabel && possibleLabel.tagName.toLowerCase() === 'label' ? possibleLabel : null;
            if (!this.labelElement) {
                const formGroup = (<Element>this.viewContainer.element.nativeElement).closest(this.formGroupSelector);
                const labels = formGroup && formGroup.querySelectorAll(this.labelSelectorToMatch);
                this.labelElement = labels && labels.length === 1 ? labels[0] : null;
            }
            if (this.labelElement && !this.labelElement.matches(this.labelSelectorToMatch)) {
                this.labelElement = null;
            }
        }
    }
}

import {
    AfterViewInit,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    DoCheck,
    Inject,
    OnDestroy,
    Optional,
    Type,
    ViewContainerRef
} from "@angular/core";
import {
    AbstractControl,
    FormControlDirective,
    FormControlName,
    FormGroupDirective,
    FormGroupName
} from "@angular/forms";
import { ValidationErrorComponent } from "./validation-error.component";
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: "[appendValidationError]"
})
export class AppendValidationErrorDirective
    implements AfterViewInit, OnDestroy, DoCheck {
    private validationErrorComponent: ComponentRef<
        ValidationErrorComponent
    > = null;
    private lastControl: AbstractControl;

    constructor(
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        @Inject(ValidationErrorComponent)
        private vmComp: Type<ValidationErrorComponent>,
        @Optional() private formControlName: FormControlName,
        @Optional() private formControlDirective: FormControlDirective,
        @Optional() private formGroupName: FormGroupName,
        @Optional() private formGroupDirective: FormGroupDirective
    ) {}
    public ngDoCheck(): void {
        // На случай, когда пересоздается форма и теперь контрол уже привязан к другому FormControl, пересоздаем все.
        if (this.lastControl) {
            const control = this.getControl();
            if (this.lastControl !== control) {
                this.validationErrorComponent.instance.for = this.lastControl = control;
                this.validationErrorComponent.instance.bindControlListener();
                this.validationErrorComponent.changeDetectorRef.detectChanges();
            }
        }
    }
    public ngAfterViewInit(): void {
        this.lastControl = this.getControl();
        const factory = this.componentFactoryResolver.resolveComponentFactory(
            this.vmComp
        );
        if (this.validationErrorComponent) {
            this.validationErrorComponent.changeDetectorRef.detach();
        }
        this.validationErrorComponent = this.viewContainer.createComponent(
            factory,
            null,
            this.viewContainer.injector
        );
        this.validationErrorComponent.instance.for = this.lastControl;
        this.validationErrorComponent.instance.bindControlListener();
        this.validationErrorComponent.changeDetectorRef.detectChanges();
    }
    public ngOnDestroy(): void {
        if (this.validationErrorComponent) {
            this.validationErrorComponent.changeDetectorRef.detach();
        }
    }
    private getControl(): AbstractControl | null {
        if (this.formControlName) {
            return this.formControlName.control;
        }
        if (this.formControlDirective) {
            return this.formControlDirective.control;
        }
        if (this.formGroupName) {
            return this.formGroupName.control;
        }
        if (this.formGroupDirective) {
            return this.formGroupDirective.control;
        }
        return null;
    }
}

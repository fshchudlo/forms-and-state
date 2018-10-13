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
import { FormControlName, FormGroupName } from "@angular/forms";
import { ValidationErrorComponent } from "./validation-error.component";
// Директива, добавляющая сразу за элементом, на который она навешана, компонент validation-error.
// Позволяет слегка сэкономить на верстке и снизить вероятность ошибок с копипастом имен полей

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: "[appendValidationError]"
})
export class AppendValidationErrorDirective
    implements AfterViewInit, OnDestroy, DoCheck {
    private validationErrorComponent: ComponentRef<
        ValidationErrorComponent
    > = null;
    private lastControl: any;

    constructor(
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        @Inject(ValidationErrorComponent)
        private vmComp: Type<ValidationErrorComponent>,
        @Optional() private formControlName: FormControlName,
        @Optional() private formGroupName: FormGroupName
    ) {}
    public ngDoCheck(): void {
        // На жесткий случай, когда пересоздается форма и теперь контрол уже привязан к другому FormControl, пересоздаем все.
        if (this.lastControl) {
            const control = this.formControlName
                ? this.formControlName.control
                : this.formGroupName.control;
            if (this.lastControl !== control) {
                this.validationErrorComponent.instance.for = this.lastControl = control;
                this.validationErrorComponent.instance.bindControlListener();
                this.validationErrorComponent.changeDetectorRef.detectChanges();
            }
        }
    }
    public ngAfterViewInit(): void {
        this.lastControl = this.formControlName
            ? this.formControlName.control
            : this.formGroupName.control;
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
}

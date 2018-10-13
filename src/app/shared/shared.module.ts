import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RadioButtonComponent } from "@shared/components/radio-button/radio-button.component";
import { AppendValidationErrorDirective } from "@shared/components/validation-error/append-validation-error.directive";
import { ValidationErrorComponent } from "@shared/components/validation-error/validation-error.component";
import { I18NextModule } from "angular-i18next";

@NgModule({
    declarations: [
        ValidationErrorComponent,
        RadioButtonComponent,
        AppendValidationErrorDirective
    ],
    entryComponents: [ValidationErrorComponent],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        I18NextModule,
        ValidationErrorComponent,
        AppendValidationErrorDirective,
        RadioButtonComponent
    ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, I18NextModule]
})
export class SharedModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                {
                    provide: ValidationErrorComponent,
                    useValue: ValidationErrorComponent
                }
            ]
        };
    }
}

import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NG_SELECT_DEFAULT_CONFIG, NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';
import { CheckboxComponent } from '@shared/components/checkbox/checkbox.component';
import { CitiesDropdownComponent } from '@shared/components/cities-dropdown/cities-dropdown.component';
import { RadioButtonComponent } from '@shared/components/radio-button/radio-button.component';
import { AppendValidationErrorDirective } from '@shared/components/validation-error/append-validation-error.directive';
import { RenderRequiredStarDirective } from '@shared/components/validation-error/render-required-star.directive';
import { ValidationErrorComponent } from '@shared/components/validation-error/validation-error.component';
import { I18NextModule, I18NextService } from 'angular-i18next';

export function ngSelectDefaultsFactory(i18next: I18NextService): NgSelectConfig {
    return {
        addTagText: i18next.t('shared:ngSelect.addTagText'),
        clearAllText: i18next.t('shared:ngSelect.clearAllText'),
        loadingText: i18next.t('shared:ngSelect.loadingText'),
        notFoundText: i18next.t('shared:ngSelect.notFoundText'),
        placeholder: i18next.t('shared:ngSelect.placeholder'),
        typeToSearchText: i18next.t('shared:ngSelect.typeToSearchText')
    };
}
@NgModule({
    declarations: [
        ValidationErrorComponent,
        CheckboxComponent,
        CitiesDropdownComponent,
        RadioButtonComponent,
        AppendValidationErrorDirective,
        RenderRequiredStarDirective
    ],
    entryComponents: [ValidationErrorComponent],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        I18NextModule,
        ValidationErrorComponent,
        AppendValidationErrorDirective,
        RenderRequiredStarDirective,
        RadioButtonComponent,
        CitiesDropdownComponent,
        CheckboxComponent
    ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, I18NextModule, NgSelectModule],
    providers: [
        {
            deps: [I18NextService],
            provide: NG_SELECT_DEFAULT_CONFIG,
            useFactory: ngSelectDefaultsFactory
        }
    ]
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

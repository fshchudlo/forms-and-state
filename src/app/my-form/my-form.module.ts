import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { I18NEXT_NAMESPACE, I18NextModule } from 'angular-i18next';
import { MyFormRoutingModule } from './my-form-routing.module';
import { MyFormComponent } from './my-form/my-form.component';
import { SaleTypeInfoComponent } from './sale-type-info/sale-type-info.component';
import { SiteAudienceComponent } from './site-audience/site-audience.component';
import { SubmitRequestButtonComponent } from './submit-request-button/submit-request-button.component';
import { TechnicalContactSettingsComponent } from './technical-contact-settings/technical-contact-settings.component';

@NgModule({
    declarations: [
        MyFormComponent,
        SubmitRequestButtonComponent,
        SaleTypeInfoComponent,
        SiteAudienceComponent,
        TechnicalContactSettingsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        I18NextModule,
        MyFormRoutingModule,
        SharedModule
    ],
    providers: [
        FormBuilder,
        {
            provide: I18NEXT_NAMESPACE,
            useValue: 'my-form'
        }
    ]
})
export class MyFormModule {}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@shared/shared.module";
import { I18NEXT_NAMESPACE } from "angular-i18next";
import { SomeEntityComponent } from "./container-component/some-entity.component";
import { NestedItemsComponent } from "./nested-items/nested-items.component";
import { ReadOnlyInfoComponent } from "./presentation-component/readonly-info.component";
import { SubmitButtonComponent } from "./smart-component/submit-button.component";
import { SomeEntityRoutingModule } from "./some-entity-routing.module";
import { SomeEntityService } from "./some-entity.service";

@NgModule({
    declarations: [
        SomeEntityComponent,
        ReadOnlyInfoComponent,
        SubmitButtonComponent,
        NestedItemsComponent
    ],
    exports: [],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SomeEntityRoutingModule
    ],
    providers: [
        SomeEntityService,
        { provide: I18NEXT_NAMESPACE, useValue: "some-entity" }
    ]
})
export class SomeEntityModule {}

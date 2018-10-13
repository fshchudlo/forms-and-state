import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SomeEntityComponent } from "./container-component/some-entity.component";

// tslint:disable-next-line:variable-name
const SomeEntityRoutes: Routes = [
    {
        path: "",
        redirectTo: "new"
    },
    {
        component: SomeEntityComponent,
        path: "new"
    },
    {
        component: SomeEntityComponent,
        path: ":id"
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(SomeEntityRoutes)]
})
export class SomeEntityRoutingModule {}

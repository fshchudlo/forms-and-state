import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { I18NEXT_NAMESPACE_RESOLVER } from "angular-i18next";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "some-entity"
    },
    {
        data: {
            i18nextNamespaces: ["some-entity"]
        },
        loadChildren: "./some-entity/some-entity.module#SomeEntityModule",
        path: "some-entity",
        resolve: {
            i18next: I18NEXT_NAMESPACE_RESOLVER
        }
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(routes, {
            useHash: false
        })
    ]
})
export class AppRoutingModule {}

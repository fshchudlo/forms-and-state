import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';
import { RoutingConfig } from '@routing.config';
import { I18NEXT_NAMESPACE_RESOLVER } from 'angular-i18next';

const routes: Routes = [
    {
        path: '',
        pathMatch: RoutingConfig.PathMatch.Full,
        redirectTo: RoutingConfig.MyForm.Base
    },
    {
        data: {
            i18nextNamespaces: ['my-form']
        },
        loadChildren: './my-form/my-form.module#MyFormModule',
        path: RoutingConfig.MyForm.Base,
        resolve: {
            i18next: I18NEXT_NAMESPACE_RESOLVER
        }
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(routes, {
            onSameUrlNavigation: 'reload',
            preloadingStrategy: NoPreloading,
            useHash: false
        })
    ]
})
export class AppRoutingModule {}

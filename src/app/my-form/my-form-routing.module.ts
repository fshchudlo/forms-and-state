import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingConfig } from '@routing.config';
import { MyFormComponent } from './my-form/my-form.component';

// tslint:disable-next-line:variable-name
const MyFormRoutes: Routes = [
    {
        path: '',
        redirectTo: RoutingConfig.MyForm.New
    },
    {
        component: MyFormComponent,
        path: RoutingConfig.MyForm.New
    },
    {
        component: MyFormComponent,
        path: RoutingConfig.MyForm.View
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(MyFormRoutes)]
})
export class MyFormRoutingModule {}

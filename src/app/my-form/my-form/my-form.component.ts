import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchIfEmpty, switchIfNotEmpty } from '@core';
import { merge, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MyFormService } from '../my-form.service';
import { MyFormFormGroup } from './my-form.form-group';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MyFormService],
    templateUrl: 'my-form.component.html'
})
export class MyFormComponent {
    public state$: Observable<Backend.MyFormState>;
    public form: MyFormFormGroup;
    constructor(route: ActivatedRoute, requestService: MyFormService) {
        this.state$ = merge(
            route.params.pipe(switchIfNotEmpty('id', (requestId: string) => requestService.get(requestId))),
            route.params.pipe(switchIfEmpty('id', () => requestService.getEmptyState()))
        ).pipe(
            tap(state => {
                this.form = new MyFormFormGroup(state);
            })
        );
    }
}

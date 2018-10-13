import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { switchIfEmpty, switchIfNotEmpty } from "@core";
import { merge, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { SomeEntityService } from "../some-entity.service";
import { SomeEntityFormGroup } from "./some-entity.form-group";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SomeEntityService],
    templateUrl: "some-entity.component.html"
})
export class SomeEntityComponent {
    public state$: Observable<Backend.SomeEntityState>;
    public form: SomeEntityFormGroup;
    constructor(route: ActivatedRoute, requestService: SomeEntityService) {
        this.state$ = merge(
            route.params.pipe(
                switchIfNotEmpty("id", (requestId: string) =>
                    requestService.get(requestId)
                )
            ),
            route.params.pipe(
                switchIfEmpty("id", () => requestService.getEmptyState())
            )
        ).pipe(
            tap(state => {
                this.form = new SomeEntityFormGroup(state);
            })
        );
    }
    public notifyAboutSave(): void {
        alert("Form was sent!");
    }
}

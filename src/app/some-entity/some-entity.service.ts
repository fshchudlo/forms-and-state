import { Injectable } from "@angular/core";
import { TypedFormGroup } from "@core";
import { Observable, of } from "rxjs";

@Injectable()
export class SomeEntityService {
    public getEmptyState(): Observable<Backend.SomeEntityState> {
        const state: Backend.SomeEntityState = {
            id: null,
            name: null,
            nestedItems: [
                {
                    id: null,
                    name: null,
                    createdBy: null,
                    createdOn: null,
                    modifiedBy: null,
                    modifiedOn: null
                }
            ],
            comment: null,
            status: "NotSent",
            urgency: "Normal",
            createdBy: null,
            createdOn: null,
            modifiedBy: null,
            modifiedOn: null
        };
        return of(state);
    }

    public get(id: string): Observable<Backend.SomeEntityState> {
        // Always return same object since we haven't real backend
        return of({
            id,
            name: "Entity name",
            comment: "ASAP!!!",
            createdBy: "test user",
            createdOn: new Date(2018, 10, 10).toLocaleDateString(),
            modifiedBy: null,
            modifiedOn: null,
            status: "InProgress",
            urgency: "High",
            nestedItems: [
                {
                    id: "123",
                    name: "One of nested items",
                    createdBy: "test user",
                    createdOn: new Date(2018, 10, 10).toLocaleDateString(),
                    modifiedBy: null,
                    modifiedOn: null
                }
            ]
        } as Backend.SomeEntityState);
    }

    public post(
        _form: TypedFormGroup<Backend.SomeEntityModel>
    ): Observable<void> {
        return of(null);
    }
}

import { FormControl, Validators } from "@angular/forms";
import { TypedFormArray, TypedFormGroup } from "@core";
import { NestedItemFormGroup } from "../nested-items/nested-item.form-group";

export class SomeEntityFormGroup extends TypedFormGroup<
    Backend.SomeEntityModel
> {
    public get nestedItems(): TypedFormArray<Backend.NestedItemModel> {
        return this.controls.nestedItems as TypedFormArray<
            Backend.NestedItemModel
        >;
    }
    constructor(state: Backend.SomeEntityState) {
        const model: Backend.SomeEntityModel = {
            id: state.id,
            comment: state.comment,
            name: state.name,
            urgency: state.urgency,
            nestedItems: state.nestedItems
        };

        const nestedFormArray = new TypedFormArray<Backend.NestedItemModel>(
            model.nestedItems.map(item => new NestedItemFormGroup(item))
        );

        const controls = {
            id: new FormControl(model.id),
            comment: new FormControl(model.comment, Validators.maxLength(4000)),
            name: new FormControl(model.name, [
                Validators.required,
                Validators.maxLength(128)
            ]),
            urgency: new FormControl(state.urgency),
            nestedItems: nestedFormArray
        };

        super(controls);
    }
}

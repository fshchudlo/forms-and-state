import { FormControl, Validators } from "@angular/forms";
import { TypedFormGroup } from "@core";

export class NestedItemFormGroup extends TypedFormGroup<
    Backend.NestedItemModel
> {
    constructor(model: Backend.NestedItemModel) {
        const controls = {
            id: new FormControl(model.id),
            name: new FormControl(model.name, [
                Validators.required,
                Validators.maxLength(128),
                Validators.minLength(5)
            ])
        };

        super(controls);
    }
}

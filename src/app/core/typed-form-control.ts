import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

export class TypedFormControl<T> extends FormControl {
    public readonly value: T;
    public valueChanges: Observable<T>;
    public setValue(
        value: T,
        options?: {
            onlySelf?: boolean;
            emitEvent?: boolean;
            emitModelToViewChange?: boolean;
            emitViewToModelChange?: boolean;
        }
    ): void {
        this.validateParentControlState();
        super.setValue(value, options);
    }
    public reset(
        formState?: any,
        options?: {
            onlySelf?: boolean;
            emitEvent?: boolean;
        }
    ): void {
        this.validateParentControlState();
        super.reset(formState, options);
    }
    private validateParentControlState(): void {
        if (this.parent && this.parent.disabled) {
            // tslint:disable-next-line:no-console
            console.warn(
                "You're trying to update disabled control"
            );
        }
    }
}

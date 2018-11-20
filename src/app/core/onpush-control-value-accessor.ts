import { ChangeDetectorRef } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";

export abstract class OnPushControlValueAccessor<TValue>
    implements ControlValueAccessor {
    public value: TValue = undefined;
    public isDisabled: boolean = false;
    constructor(protected changeDetectorRef: ChangeDetectorRef) {}
    public changeCallback: (value: TValue) => void = (_: TValue) => {
        return;
    };
    public touchCallback: () => void = () => {
        return;
    };

    public writeValue(value: TValue): void {
        this.value = value;
        // writeValue is not working properly with OnPush, so we use changeDetectorRef
        // see deatils here https://github.com/angular/angular/issues/10816
        this.changeDetectorRef.markForCheck();
    }
    public registerOnChange(fn: any): void {
        this.changeCallback = fn;
    }
    public registerOnTouched(fn: any): void {
        this.touchCallback = fn;
    }
    public setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
        this.changeDetectorRef.markForCheck();
    }
}

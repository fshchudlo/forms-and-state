import { ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export abstract class OnPushControlValueAccessor<TValue> implements ControlValueAccessor {
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
        // С writeValue событие не сработает, поскольку значение выставляется через setTimeout. Поэтому явно помечаем контрол для проверки
        // https://github.com/angular/angular/issues/10816
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

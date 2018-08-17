import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OnPushControlValueAccessor } from '@core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            multi: true,
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CitiesDropdownComponent)
        }
    ],
    selector: 'cities-dropdown',
    templateUrl: 'cities-dropdown.component.html'
})
export class CitiesDropdownComponent extends OnPushControlValueAccessor<Backend.LookupValue> {
    @Output()
    public readonly loading: EventEmitter<boolean> = new EventEmitter();
    public cities: Backend.LookupValue[] = [
        {
            id: `MOW`,
            text: 'Москва'
        },
        {
            id: `BER`,
            text: 'Берлин'
        },
        {
            id: `NYC`,
            text: 'Нью-йорк'
        }
    ];
    constructor(changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef);
    }
}

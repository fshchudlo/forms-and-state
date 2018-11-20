import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    Input
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { OnPushControlValueAccessor } from "@core";
import { BehaviorSubject } from "rxjs";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            multi: true,
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioButtonComponent)
        }
    ],
    selector: "radio-button",
    styleUrls: ["./radio-button.component.scss"],
    templateUrl: "radio-button.component.html"
})
export class RadioButtonComponent extends OnPushControlValueAccessor<string> {
    @Input()
    public name: string;
    @Input()
    public checkedValue: string;
    public checked: BehaviorSubject<boolean> = new BehaviorSubject(false);
    constructor(changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef);
    }
    public valueChanged(value: string): void {
        this.checked.next(this.checkedValue === value);
        this.changeCallback(value);
    }
    public writeValue(value: string): void {
        this.checked.next(this.checkedValue === value);
        super.writeValue(value);
    }
}

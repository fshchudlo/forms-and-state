import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    Input,
    Renderer2,
    ViewChild
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { OnPushControlValueAccessor } from "@core";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            multi: true,
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent)
        }
    ],
    // tslint:disable-next-line:component-selector
    selector: "checkbox",
    templateUrl: "checkbox.component.html"
})
export class CheckboxComponent extends OnPushControlValueAccessor<boolean> {
    @Input()
    public iconClass: string = null;
    @ViewChild("checkbox")
    private checkboxElem: any;
    constructor(
        private renderer: Renderer2,
        changeDetectorRef: ChangeDetectorRef
    ) {
        super(changeDetectorRef);
    }
    public writeValue(value: boolean): void {
        this.renderer.setProperty(
            this.checkboxElem.nativeElement,
            "checked",
            value
        );
        super.writeValue(value);
    }
}

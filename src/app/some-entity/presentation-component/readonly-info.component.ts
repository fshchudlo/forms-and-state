import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    SimpleChange
} from "@angular/core";
import { ReadonlyInfoComponentTraits } from "./readonly-info-component.traits";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "readonly-info",
    templateUrl: "./readonly-info.component.html"
})
export class ReadOnlyInfoComponent implements OnChanges {
    @Input()
    public state: Backend.SomeEntityState;
    public traits: ReadonlyInfoComponentTraits;
    public ngOnChanges(changes: { state: SimpleChange }): void {
        this.traits = new ReadonlyInfoComponentTraits(changes.state.currentValue);
    }
}

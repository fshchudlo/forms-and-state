import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    SimpleChange
} from "@angular/core";
import { ReadonlyInfoTraits } from "./readonly-info.traits";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "readonly-info",
    templateUrl: "./readonly-info.component.html"
})
export class ReadOnlyInfoComponent implements OnChanges {
    @Input()
    public state: Backend.SomeEntityState;
    public traits: ReadonlyInfoTraits;
    public ngOnChanges(changes: { state: SimpleChange }): void {
        this.traits = new ReadonlyInfoTraits(changes.state.currentValue);
    }
}

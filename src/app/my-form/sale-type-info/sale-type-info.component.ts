import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { isSubagent } from './enums';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sale-type-info',
    templateUrl: 'sale-type-info.component.html'
})
export class SaleTypeInfoComponent {
    public get displaySubagentFields(): boolean {
        return isSubagent(this.controlContainer.control.value.saleType);
    }
    constructor(public controlContainer: ControlContainer) {}
}

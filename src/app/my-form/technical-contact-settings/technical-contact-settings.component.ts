import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { merge, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'technical-contact-settings',
    templateUrl: 'technical-contact-settings.component.html'
})
export class TechnicalContactSettingsComponent implements AfterViewInit, OnDestroy {
    public readonly existingContactCanBeSelected: Subject<boolean> = new Subject();
    public destroyed$: Subject<boolean> = new Subject();
    public get formGroup(): FormGroup {
        return this.controlContainer.control as FormGroup;
    }
    constructor(public controlContainer: ControlContainer) {}
    public ngAfterViewInit(): void {
        const contactsControl = this.formGroup.controls.availableContacts;
        // of([]) это мини-трюк чтобы запустить проверку сразу же при старте, даже если contactsControl не кидает событий
        merge(of([]), contactsControl.valueChanges, contactsControl.statusChanges)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
                this.existingContactCanBeSelected.next(contactsControl.value.length > 0 || contactsControl.disabled);
            });
    }
    public ngOnDestroy(): void {
        this.destroyed$.next(true);
    }
}

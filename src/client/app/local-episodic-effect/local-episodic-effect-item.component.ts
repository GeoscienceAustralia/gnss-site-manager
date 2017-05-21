import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AbstractItemComponent, ItemControls } from '../shared/abstract-groups-items/abstract-item.component';
import { LocalEpisodicEffectViewModel } from './local-episodic-effect-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

/**
 * This component represents a single Local Episodic Effect.
 */
@Component({
    moduleId: module.id,
    selector: 'local-episodic-effect-item',
    templateUrl: 'local-episodic-effect-item.component.html',
})
export class LocalEpisodicEffectItemComponent extends AbstractItemComponent {
    /**
     * The LocalEpisodicEffect in question.
     */
    @Input() localEpisodicEffect: LocalEpisodicEffectViewModel;

    constructor(protected dialogService: DialogService, private formBuilder: FormBuilder) {
        super(dialogService);
    }

    getItemName(): string {
        return 'Local Episodic Effect';
    }

    getItem(): AbstractViewModel {
        return this.localEpisodicEffect;
    }

    /**
     * Return the controls to become the form.
     *
     * @return array of AbstractControl objects
     */
    getFormControls(): ItemControls {
        // let itemGroup: FormGroup = formBuilder.group({
        // turn off all Validators until work out solution to 'was false now true' problem
        // TODO Fix Validators
        return new ItemControls([
            {event: new FormControl('')},//, [Validators.required, Validators.minLength(100)]],
            {startDate: new FormControl('')},//, [Validators.required]],
            {endDate: new FormControl('')},  // requiredIfNotCurrent="true"
            {objectMap: new FormControl('')},
            {dateDeleted: new FormControl('')},
            {dateInserted: new FormControl('')},
            {deletedReason: new FormControl('')}
        ]);
    }

}

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractItem } from '../shared/abstract-groups-items/abstract-item';
import { GeodesyEvent } from '../shared/events-messages/Event';
import { LocalEpisodicEventViewModel } from './local-episodic-event-view-model';
import { DialogService } from '../shared/index';

/**
 * This component represents a single Local Episodic Effect.
 */
@Component({
    moduleId: module.id,
    selector: 'local-episodic-effect-item',
    templateUrl: 'local-episodic-effect-item.component.html',
})
export class LocalEpisodicEventItemComponent extends AbstractItem implements OnInit {
    /**
     * The LocalEpisodicEffect in question.
     */
    @Input() localEpisodicEffect: LocalEpisodicEffectViewModel;

    constructor(protected dialogService: DialogService, private formBuilder: FormBuilder) {
        super(dialogService);
    }

    ngOnInit() {
        this.setupForm();
        this.patchForm();
    }

    private setupForm() {
        this.itemGroup = this.formBuilder.group({
             // turn off all Validators until work out solution to 'was false now true' problem
            // TODO Fix Validators
            event: [''],//, [Validators.required, Validators.minLength(100)]],
            startDate: [''],//, [Validators.required]],
            endDate: ['', []],  // requiredIfNotCurrent="true"
            fieldMaps: '',
            dateDeleted: '',
            dateInserted: '',
            deletedReason: ''
        });
        this.groupArray.push(this.itemGroup);
    }

    protected patchForm() {
        this.itemGroup.setValue(this.localEpisodicEvent);
    }

    getItemName(): string {
        return 'Local Episodic Effect';
    }
}

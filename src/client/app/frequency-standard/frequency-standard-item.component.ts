import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractItem } from '../shared/abstract-groups-items/abstract-item';
import { GeodesyEvent } from '../shared/events-messages/Event';
import { FrequencyStandardViewModel } from './frequency-standard-view-model';
import { DialogService } from '../shared/index';

/**
 * This class represents a single item of GNSS Antennas.
 */
@Component({
  moduleId: module.id,
  selector: 'frequency-standard-item',
  templateUrl: 'frequency-standard-item.component.html',
})
export class FrequencyStandardItemComponent extends AbstractItem implements OnInit {
  /**
   * The Frequency Standard in question.
   */
  @Input() frequencyStandard: FrequencyStandardViewModel;

  constructor(protected dialogService: DialogService, private formBuilder: FormBuilder) {
    super(dialogService);
  }

    ngOnInit() {
        this.setupForm();
        this.patchForm();
    }

     protected patchForm() {
        this.itemGroup.setValue(this.frequencyStandard);
    }

  getItemName(): string {
    return 'Frequency Standard';
  }

    private setupForm() {
        this.itemGroup = this.formBuilder.group({
            // turn off all Validators until work out solution to 'was false now true' problem
            // TODO Fix Validators
            standardType: [''],//, [Validators.minLength(4)]],
            inputFrequency: [''],//, [Validators.maxLength(100)]],
            startDate: [''],//, [Validators.required]],
            endDate: [''],  //  requiredIfNotCurrent="true"
            notes: [''],//, [Validators.maxLength(2000)]],
            fieldMaps: '',
            dateDeleted: '',
            dateInserted: '',
            deletedReason: ''
        });
        this.addToGroupArray(this.itemGroup);
    }
}

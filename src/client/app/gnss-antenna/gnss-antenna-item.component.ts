import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractItem } from '../shared/abstract-groups-items/abstract-item';
import { GeodesyEvent } from '../shared/events-messages/Event';
import { GnssAntennaViewModel } from './gnss-antenna-view-model';
import { MiscUtils } from '../shared/global/misc-utils';
import { DialogService } from '../shared/index';

/**
 * This class represents a single item of GNSS Antennas.
 */
@Component({
  moduleId: module.id,
  selector: 'gnss-antenna-item',
  templateUrl: 'gnss-antenna-item.component.html',
})
export class GnssAntennaItemComponent extends AbstractItem implements OnInit {
  /**
   * The GNSS Antenna in question.
   */
  @Input() antenna: GnssAntennaViewModel;

  constructor(protected dialogService: DialogService, private formBuilder: FormBuilder) {
    super(dialogService);
  }

    ngOnInit() {
        this.setupForm();
        this.patchForm();
    }

    protected patchForm() {
        this.itemGroup.setValue(this.antenna);
    }

  getItemName(): string {
    return 'GNSS Antenna';
  }


    private setupForm() {
        this.itemGroup = this.formBuilder.group({
            // turn off all Validators until work out solution to 'was false now true' problem
            // TODO Fix Validators
            antennaType: [''],//, [Validators.maxLength(100)]],
            serialNumber: [''],//, [Validators.maxLength(100)]],
            dateInstalled: [''],//, [Validators.required, dateTimeFormatValidator]],
            dateRemoved: '',    // requiredIfNotCurrent="true"
            antennaReferencePoint: [''],//, [Validators.maxLength(100)]],
            markerArpEastEcc: [''],//, [Validators.maxLength(100)]],
            markerArpUpEcc: [''],//, [Validators.maxLength(100)]],
            markerArpNorthEcc: [''],//, [Validators.maxLength(100)]],
            alignmentFromTrueNorth: [''],//, [Validators.maxLength(100)]],
            antennaRadomeType: [''],//, [Validators.maxLength(100)]],
            radomeSerialNumber: [''],//, [Validators.maxLength(100)]],
            antennaCableType: [''],//, [Validators.maxLength(100)]],
            antennaCableLength: [''],//, [Validators.maxLength(100)]],
            notes: [''],//, [Validators.maxLength(20)]],
            fieldMaps: '',
            dateDeleted: '',
            dateInserted: '',
            deletedReason: ''
        });
        this.addToGroupArray(this.itemGroup);
    }
}

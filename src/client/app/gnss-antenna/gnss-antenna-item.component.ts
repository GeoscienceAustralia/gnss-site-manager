import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { DialogService } from '../shared/index';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This class represents a single item of GNSS Antennas.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-antenna-item',
    templateUrl: 'gnss-antenna-item.component.html',
})
export class GnssAntennaItemComponent extends AbstractItemComponent {

    constructor(protected userAuthService: UserAuthService,
                protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'GNSS Antenna';
    }

    /**
     * Return the item form with default values and form controls.
     */
    getItemForm(): FormGroup {
        return this.formBuilder.group({
            id: [null],
            antennaType: ['', [Validators.maxLength(100)]],
            serialNumber: ['', [Validators.maxLength(50)]],
            startDate: [''],
            endDate: [''],
            antennaReferencePoint: ['', [Validators.maxLength(50)]],
            markerArpEastEcc: ['', [Validators.maxLength(50)]],
            markerArpUpEcc: ['', [Validators.maxLength(50)]],
            markerArpNorthEcc: ['', [Validators.maxLength(50)]],
            alignmentFromTrueNorth: ['', [Validators.maxLength(50)]],
            antennaRadomeType: ['', [Validators.maxLength(50)]],
            radomeSerialNumber: ['', [Validators.maxLength(50)]],
            antennaCableType: ['', [Validators.maxLength(25)]],
            antennaCableLength: ['', [Validators.maxLength(25)]],
            notes: ['', [Validators.maxLength(2000)]],
            objectMap: [''],
        });
    }
}

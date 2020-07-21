import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { GnssAntennaViewModel } from './gnss-antenna-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { SiteLogService } from '../shared/site-log/site-log.service';
import { AntennaRadomeTypeValidator } from '../shared/form-input-validators/antenna-radome-type-validator';
import { RadomeTypeValidator } from '../shared/form-input-validators/radome-type-validator';

/**
 * This class represents a single item of GNSS Antennas.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-antenna-item',
    templateUrl: 'gnss-antenna-item.component.html',
})
export class GnssAntennaItemComponent extends AbstractItemComponent {
    /**
     * The GNSS Antenna in question.
     */
    @Input() antenna: GnssAntennaViewModel;
    @Input() antennaRadomeCodelist: string[];

    constructor(protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(dialogService, siteLogService);
    }

    getItemName(): string {
        return 'GNSS Antenna';
    }

    getItem(): AbstractViewModel {
        return this.antenna;
    }

    /**
     * Return the item form with default values and form controls.
     */
    getItemForm(): FormGroup {
        return this.formBuilder.group({
            id: [null],
            antennaType: ['', [Validators.minLength(20), Validators.maxLength(20),
                new AntennaRadomeTypeValidator(this.antennaRadomeCodelist)]],
            serialNumber: ['', [Validators.maxLength(50)]],
            startDate: [''],
            endDate: [''],
            antennaReferencePoint: ['', [Validators.maxLength(50)]],
            markerArpEastEcc: ['', [Validators.maxLength(50)]],
            markerArpUpEcc: ['', [Validators.maxLength(50)]],
            markerArpNorthEcc: ['', [Validators.maxLength(50)]],
            alignmentFromTrueNorth: ['', [Validators.maxLength(50)]],
            antennaRadomeType: ['', [Validators.minLength(4), Validators.maxLength(4),
                new RadomeTypeValidator(this.getRadomeCodelist())]],
            radomeSerialNumber: ['', [Validators.maxLength(50)]],
            antennaCableType: ['', [Validators.maxLength(100)]],
            antennaCableLength: ['', [Validators.maxLength(25)]],
            notes: ['', [Validators.maxLength(2000)]],
            objectMap: [''],
        });
    }

    onAntennaRadomeTypeChange(event:any) {
        this.antenna.antennaType = event.value;
        this.antenna.antennaRadomeType = event.value.substring(16, 20);
        this.itemGroup.controls.antennaType.setValue(this.antenna.antennaType);
        this.itemGroup.controls.antennaRadomeType.setValue(this.antenna.antennaRadomeType);
    }

    private getRadomeCodelist(): string[] {
        let radomeSet = new Set<string>();
        this.antennaRadomeCodelist.forEach((antennaRadomeType: string) => {
            radomeSet.add(antennaRadomeType.slice(16, 20));
        });
        return Array.from(radomeSet);
    }
}

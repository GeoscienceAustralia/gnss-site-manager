import { Component, Input, OnInit } from '@angular/core';
import { AbstractGroup } from '../shared/abstract-groups-items/abstract-group';
import { FrequencyStandardViewModel } from './frequency-standard-view-model';
import { FormArray } from '@angular/forms';

/**
 * This class represents a collection of FrequencyStandard Component.
 */
@Component({
  moduleId: module.id,
  selector: 'frequency-standard-group',
  templateUrl: 'frequency-standard-group.component.html',
})
export class FrequencyStandardGroupComponent extends AbstractGroup<FrequencyStandardViewModel> implements OnInit {
    @Input() frequencyStandards: any;

  @Input()
  set siteLogModel(siteLogModel: any) {
    siteLogModel && this.setItemsCollection(siteLogModel.frequencyStandards);
  }

  @Input()
  set originalSiteLogModel(originalSiteLogModel: any) {
    originalSiteLogModel && this.setItemsOriginalCollection(originalSiteLogModel.frequencyStandards);
  }

    static compare(obj1: FrequencyStandardViewModel, obj2: FrequencyStandardViewModel): number {
        let date1: string = obj1.startDate;
        let date2: string = obj2.startDate;
        return AbstractGroup.compareDates(date1, date2);
    }

    ngOnInit() {
        this.setupForm();
    }

    getItemName(): string {
    return 'Frequency Standard';
  }

    compare(obj1: FrequencyStandardViewModel, obj2: FrequencyStandardViewModel): number {
        return FrequencyStandardGroupComponent.compare(obj1, obj2);
    }

  newViewModelItem(blank?: boolean): FrequencyStandardViewModel {
    return new FrequencyStandardViewModel(blank);
  }

    private setupForm() {
        this.groupArrayForm =  new FormArray([]);
        this.siteInfoForm.addControl('frequencyStandards', this.groupArrayForm);
    }
}

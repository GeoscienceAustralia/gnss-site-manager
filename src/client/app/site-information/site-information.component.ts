import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MiscUtils } from '../shared/index';
import { SiteLogViewModel }  from '../site-log/site-log-view-model';
import { ResponsiblePartyType } from '../responsible-party/responsible-party-group.component';

/**
 * This class represents the SiteInformationComponent for viewing and editing the details of
 * siteIdentification, siteLocation and responsibleParties (site owner/contacts/dataCustodian/dataCenters/dataSource).
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-site-information',
    templateUrl: 'site-information.component.html'
})
export class SiteInformationComponent implements OnInit {

    @Input() parentForm: FormGroup;
    @Input() siteLogModel: SiteLogViewModel;

    public siteInformationForm: FormGroup;
    public miscUtils: any = MiscUtils;
    public responsiblePartyType: any = ResponsiblePartyType;    // Used in template
    public isFormOpen: boolean = false;

    /**
     * Creates an instance of the SiteInformationComponent.
     */
    constructor(private formBuilder: FormBuilder) {
    }

    /**
     * Initialise all data on loading the site-log page
     */
    public ngOnInit() {
        this.setupForm();
    }

    public isFormDirty(): boolean {
        return this.siteInformationForm && this.siteInformationForm.dirty;
    }

    public isFormInvalid(): boolean {
        return this.siteInformationForm.invalid;
    }

    private setupForm() {
        this.siteInformationForm = this.formBuilder.group({});
        this.parentForm.addControl('siteInformation', this.siteInformationForm);
    }
}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { MiscUtils } from '../shared/index';
import { SiteLogViewModel }  from '../site-log/site-log-view-model';
import { ResponsiblePartyType } from '../responsible-party/responsible-party-group.component';
import { SiteImageComponent } from '../site-image/site-image.component';

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
    @Input() siteId: string;

    @ViewChild(SiteImageComponent)
    siteImageComponent: SiteImageComponent;

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

    public saveSiteImages(): Observable<boolean> {
        return this.siteImageComponent.save();
    }

    private setupForm() {
        this.siteInformationForm = this.formBuilder.group({
            siteOwner: this.formBuilder.array([]),
            siteContacts: this.formBuilder.array([]),
            siteMetadataCustodian: this.formBuilder.array([]),
            siteDataCenters: this.formBuilder.array([]),
            siteDataSource: this.formBuilder.array([]),
        });
        this.parentForm.addControl('siteInformation', this.siteInformationForm);
    }
}

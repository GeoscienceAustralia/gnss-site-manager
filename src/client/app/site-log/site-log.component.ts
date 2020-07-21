import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { User } from 'oidc-client';
import * as _ from 'lodash';

import { DialogService, MiscUtils, SiteLogService } from '../shared/index';
import { SiteLogViewModel }  from '../site-log/site-log-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { ApplicationSaveState } from '../shared/site-log/site-log.service';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { ResponsiblePartyGroupComponent } from '../responsible-party/responsible-party-group.component';

/**
 * This class represents the SiteLogComponent for viewing and editing the details of site/receiver/antenna.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-site-log',
    templateUrl: 'site-log.component.html'
})
export class SiteLogComponent implements OnInit, OnDestroy {
    @Input() parentForm: FormGroup;
    @Input() siteId: string;
    @Input() siteLogModel: SiteLogViewModel;
    @Input() antennaRadomeCodelist: string[];
    @Input() receiverCodelist: string[];
    @Output() runningStatusEmitter = new EventEmitter<boolean>();

    public miscUtils: any = MiscUtils;
    public siteLogForm: FormGroup;

    private unsubscribe: Subject<void> = new Subject<void>();

    /**
     * Creates an instance of the SiteLogComponent with the injected services.
     *
     * @param {DialogService} dialogService - The injected DialogService.
     * @param {SiteLogService} siteLogService - The injected SiteLogService.
     * @param {UserAuthService} userAuthService - The injected UserAuthService.
     */
    constructor(private router: Router,
                private dialogService: DialogService,
                private siteLogService: SiteLogService,
                private userAuthService: UserAuthService,
                private formBuilder: FormBuilder) {
    }

    /**
     * Initialise all data on loading the site-log page
     */
    public ngOnInit() {
        this.setupForm();
        this.setupSubscriptions();
    }

    /**
     * Clear all variables/arrays
     */
    public ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
        this.siteLogModel = null;
    }

    public save() {
        let formValueClone: any = _.cloneDeep(this.siteLogForm.getRawValue());
        this.moveSiteInformationUp(formValueClone);
        this.sortArrays(formValueClone);
        console.log(' formValue before merge and after reverse: ', formValueClone);

        if (this.siteId === 'newSite') {
            this.saveNewSiteLog(formValueClone);
        } else {
            this.saveExistingSiteLog(formValueClone);
        }
    }

    public saveNewSiteLog(formValue: any) {
        this.startRunning();
        _.merge(this.siteLogModel, formValue);
        this.removeDeletedItems();

        this.siteLogService.saveNewSiteLog(this.siteLogModel)
            .takeUntil(this.unsubscribe)
            .subscribe(
                (responseJson: any) => {
                    this.resetFormStatusAfterSave();
                    this.dialogService.showSuccessMessage('Done in saving new site log data');
                    this.dialogService.showNotificationDialog(
                        `Thank you for requesting a new site. You will be contacted by a member
                         from the GNSS Operations Team at Geoscience Australia regarding your request.`,
                        () => this.router.navigate(['/'])
                    );
                },
                (error: Error) => {
                    this.stopRunning();
                    console.error(error);
                    this.dialogService.showErrorMessage('Error in saving new site log data');
                }
            );
    }

    public saveExistingSiteLog(formValue: any) {
        if (!this.siteLogForm.dirty) {
            return;
        }

        this.startRunning();
        _.mergeWith(this.siteLogModel, formValue,
            (objectValue: any, sourceValue: any, key: string, _object: any, _source: any, stack: any) => {
                if (stack.size === 0 && _.isArray(objectValue)) {
                    let existingItems: any[] = [];
                    let newItems: any[] = [];
                    objectValue.concat(sourceValue).forEach((item: any) => {
                        if (item.id != null) {
                            existingItems[item.id] = Object.assign(existingItems[item.id] || {}, item);
                        } else {
                            newItems.push(item);
                        }
                    });
                    return existingItems.concat(newItems);
                } else {
                    return undefined;
                }
            }
        );
        this.removeDeletedResponsibleParties();

        // TODO: what's a good way to force `@Input siteLogModel` in child components?
        this.siteLogModel = _.clone(this.siteLogModel);

        this.siteLogService.saveSiteLog(this.siteLogModel)
            .takeUntil(this.unsubscribe)
            .subscribe(
                (responseJson: any) => {
                    this.stopRunning();
                    this.siteLogForm.markAsPristine();
                    this.siteLogService.sendApplicationStateMessage({
                        applicationFormModified: false,
                        applicationFormInvalid: false,
                        applicationSaveState: ApplicationSaveState.saved
                    });
                    this.siteLogService.sendApplicationStateMessage({
                        applicationFormModified: false,
                        applicationFormInvalid: false,
                        applicationSaveState: ApplicationSaveState.idle
                    });
                    this.dialogService.showSuccessMessage('Done in saving SiteLog data for ' + this.siteId);
                },
                (error: Error) => {
                    this.stopRunning();
                    console.error(error);
                    this.dialogService.showErrorMessage('Error in saving SiteLog data for ' + this.siteId);
                }
            );
    }

    public isFormDirty(): boolean {
        return this.siteLogForm.dirty;
    }

    public isFormInvalid(): boolean {
        return this.siteLogForm.invalid;
    }

    private setupForm() {
        this.siteLogForm = this.formBuilder.group({
            gnssAntennas: this.formBuilder.array([]),
            gnssReceivers: this.formBuilder.array([]),
            frequencyStandards: this.formBuilder.array([]),
            collocationInformation: this.formBuilder.array([]),
            humiditySensors: this.formBuilder.array([]),
            localEpisodicEffects: this.formBuilder.array([]),
            multipathSources: this.formBuilder.array([]),
            pressureSensors: this.formBuilder.array([]),
            radioInterferences: this.formBuilder.array([]),
            signalObstructions: this.formBuilder.array([]),
            surveyedLocalTies: this.formBuilder.array([]),
            temperatureSensors: this.formBuilder.array([]),
            waterVaporSensors: this.formBuilder.array([]),
            otherInstrumentation: this.formBuilder.array([]),
        });

        this.parentForm.addControl('siteLogForm', this.siteLogForm);
    }

    /**
     * Template and Model driven forms are handled differently and separately
     */
    private setupSubscriptions() {
        this.siteLogForm.valueChanges.debounceTime(500)
            .takeUntil(this.unsubscribe)
            .subscribe((value: any) => {
                this.siteLogService.sendApplicationStateMessage({
                    applicationFormModified: this.siteLogForm.dirty,
                    applicationFormInvalid: this.siteLogForm.invalid,
                    applicationSaveState: ApplicationSaveState.idle
                });
            });

        this.siteLogForm.statusChanges.debounceTime(500)
            .takeUntil(this.unsubscribe)
            .subscribe((value: any) => {
                this.siteLogService.sendApplicationStateMessage({
                    applicationFormModified: this.siteLogForm.dirty,
                    applicationFormInvalid: this.siteLogForm.invalid,
                    applicationSaveState: ApplicationSaveState.idle
                });
            });

        this.userAuthService.user
            .takeUntil(this.unsubscribe)
            .subscribe((_: User) => {
                this.userAuthService.hasAuthorityToEditSite(this.siteId).subscribe(authorised => {
                    if (authorised) {
                        this.siteLogService.isUserAuthorisedToEditSite.next(true);
                        this.siteLogForm.enable();
                    } else {
                        this.siteLogService.isUserAuthorisedToEditSite.next(false);
                        this.siteLogForm.disable();
                    }
                });
            });
    }

    private returnAssociatedComparator(itemName: string): any {
        if (itemName === 'siteContacts' || itemName === 'siteDataCenters') {
            return ResponsiblePartyGroupComponent.compare;
        } else {
            return AbstractGroupComponent.compare;
        }
    }

    private resetFormStatusAfterSave() {
        this.stopRunning();
        this.siteLogForm.markAsPristine();
        this.siteLogService.sendApplicationStateMessage({
            applicationFormModified: false,
            applicationFormInvalid: false,
            applicationSaveState: ApplicationSaveState.idle
        });
    }

    /**
     * Sort the the array items (eg. gnssAntennas) in the form data
     * @param formValue
     */
    private sortArrays(formValue: any) {
        let itemNames: string[] = Object.keys(formValue);
        for (let itemName of itemNames) {
            if (Array.isArray(formValue[itemName])) {
                formValue[itemName].sort(this.returnAssociatedComparator(itemName));
            }
        }
    }

    /**
     * Due to how we artifically nest SiteLocation and SiteIdentification under a SiteIdentificationForm, this data is not in the
     * same location as the SiteLogModel.  This method moves it up a level.
     *
     * @param formValue
     */
    private moveSiteInformationUp(formValue: any) {
        this.moveSiteInformationUpSpecifically(formValue, 'siteOwner');
        this.moveSiteInformationUpSpecifically(formValue, 'siteContacts');
        this.moveSiteInformationUpSpecifically(formValue, 'siteMetadataCustodian');
        this.moveSiteInformationUpSpecifically(formValue, 'siteDataCenters');
        this.moveSiteInformationUpSpecifically(formValue, 'siteDataSource');
    }

    private moveSiteInformationUpSpecifically(formValue: any, subObject: string) {
        if (formValue.siteInformation[subObject]) {
            formValue[subObject] = formValue.siteInformation[subObject];
            delete formValue.siteInformation[subObject];
        }
    }

    private removeDeletedResponsibleParties() {
        this.removeDeletedGroupItems(this.siteLogModel.siteOwner);
        this.removeDeletedGroupItems(this.siteLogModel.siteContacts);
        this.removeDeletedGroupItems(this.siteLogModel.siteMetadataCustodian);
        this.removeDeletedGroupItems(this.siteLogModel.siteDataCenters);
        this.removeDeletedGroupItems(this.siteLogModel.siteDataSource);
    }

    /**
     * When items are deleted they are given a dateRemoved, but aren't deleted until now (so they show up in the diff).
     */
    private removeDeletedItems() {
        let keys: string[] = Object.keys(this.siteLogModel);
        for (let key of keys) {
            let item = (<any> this.siteLogModel)[key];
            if (Array.isArray(item)) {
                this.removeDeletedGroupItems(item);
            }
        }
    }

    private removeDeletedGroupItems(siteLogModelGroupItems: any[]) {
        for (let i: number = siteLogModelGroupItems.length - 1; i >= 0; i--) {
            if (siteLogModelGroupItems[i].isDeleted) {
                siteLogModelGroupItems.splice(i, 1);
            }
        }
    }

    private startRunning() {
        this.runningStatusEmitter.emit(true);
    }

    private stopRunning() {
        this.runningStatusEmitter.emit(false);
    }
}

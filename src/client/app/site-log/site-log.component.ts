import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { User } from 'oidc-client';
import * as _ from 'lodash';

import { DialogService, MiscUtils, SiteLogService } from '../shared/index';
import { SiteLogViewModel }  from '../shared/json-data-view-model/view-model/site-log-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { ApplicationSaveState } from '../shared/site-log/site-log.service';
import { ResponsiblePartyGroupComponent } from '../responsible-party/responsible-party-group.component';
import { GnssReceiversGroupComponent } from '../gnss-receiver/gnss-receivers-group.component';
import { FrequencyStandardGroupComponent } from '../frequency-standard/frequency-standard-group.component';
import { GnssAntennaGroupComponent } from '../gnss-antenna/gnss-antenna-group.component';
import { HumiditySensorsGroupComponent } from '../humidity-sensor/humidity-sensors-group.component';
import { PressureSensorsGroupComponent } from '../pressure-sensor/pressure-sensors-group.component';
import { LocalEpisodicEffectsGroupComponent } from '../local-episodic-effect/local-episodic-effects-group.component';
import { SurveyedLocalTiesGroupComponent } from '../surveyed-local-tie/surveyed-local-ties-group.component';
import { TemperatureSensorsGroupComponent } from '../temperature-sensor/temperature-sensors-group.component';
import { WaterVaporSensorsGroupComponent } from '../water-vapor-sensor/water-vapor-sensors-group.component';
import { RadioInterferenceGroupComponent } from '../radio-interference/radio-interference-group.component';
import { SignalObstructionGroupComponent } from '../signal-obstruction/signal-obstruction-group.component';
import { MultipathSourceGroupComponent } from '../multipath-source/multipath-source-group.component';

/**
 * This class represents the SiteLogComponent for viewing and editing the details of site/receiver/antenna.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-site-log',
    templateUrl: 'site-log.component.html'
})
export class SiteLogComponent implements OnInit, OnDestroy {
    public miscUtils: any = MiscUtils;
    public siteLogForm: FormGroup;
    public siteLogModel: SiteLogViewModel;

    private siteId: string;
    private isLoading: boolean = false;
    private reverting: boolean = false;
    private unsubscribe: Subject<void> = new Subject<void>();

    /**
     * Creates an instance of the SiteLogComponent with the injected Router/ActivatedRoute/CorsSite Services.
     *
     * @param {Router} router - The injected Router.
     * @param {ActivatedRoute} route - The injected ActivatedRoute.
     * @param {DialogService} dialogService - The injected DialogService.
     * @param {SiteLogService} siteLogService - The injected SiteLogService.
     */
    constructor(private router: Router,
                private route: ActivatedRoute,
                private dialogService: DialogService,
                private siteLogService: SiteLogService,
                private userAuthService: UserAuthService,
                private formBuilder: FormBuilder) {
    }

    @HostListener('window:beforeunload', ['$event'])
    public onBeforeUnload($event: UIEvent): void {
        if (this.isFormDirty() && !this.reverting) {
            $event.returnValue = false;
        }
    }

    /**
     * Initialise all data on loading the site-log page
     */
    public ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id: string = params['id'];
            this.siteId = id;
        });

        this.isLoading = true;
        this.route.data.subscribe((data: {siteLogModel: SiteLogViewModel}) => {

            // if we already have a siteLogForm then this looks like a good place to reload the page
            // TODO possibly work out a way to clear out all the data instead
            if (this.siteLogForm) {
                window.location.reload();
            }

            this.siteLogModel = data.siteLogModel;
            this.setupAuthSubscription();
            this.setupForm();
            this.setupSubscriptions();
            this.siteLogService.sendApplicationStateMessage({
                applicationFormModified: false,
                applicationFormInvalid: false,
                applicationSaveState: ApplicationSaveState.idle
            });
            this.isLoading = false;
            this.dialogService.showSuccessMessage('Site log loaded successfully for ' + this.siteId);
        });
        this.isLoading = false;
    }

    /**
     * Clear all variables/arrays
     */
    public ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();

        this.isLoading = false;
        this.siteId = null;
        this.siteLogModel = null;
    }

    /**
     * Save changes made back to siteLog XML
     */
    public save() {

        if (!this.userAuthService.hasAuthorityToEditSite()) {
            console.warn('Cannot save SiteLog - user does not have edit rights');
            this.dialogService.showErrorMessage('Cannot save SiteLog - user does not have edit rights');
            return;
        } else if (!this.isFormDirty()) {
            this.dialogService.showLogMessage('No changes have been made for ' + this.siteId + '.');
            this.siteLogService.sendApplicationStateMessage({
                applicationFormModified: false,
                applicationFormInvalid: false,
                applicationSaveState: ApplicationSaveState.saving
            });
            return;
        }

        this.dialogService.confirmSaveDialog(
            () => {
                this.isLoading = true;
                let formValueClone: any = _.cloneDeep(this.siteLogForm.getRawValue());
                this.moveSiteInformationUp(formValueClone);
                this.sortArrays(formValueClone);
                console.log(' formValue before merge and after reverse: ', formValueClone);

                if (this.siteId !== 'newSite') {
                    this.saveExistingSiteLog(formValueClone);
                } else {
                    this.saveNewSiteLog(formValueClone);
                }
            },
            () => {
                this.dialogService.showLogMessage('Cancelled in saving SiteLog data for ' + this.siteId);
                this.isLoading = false;
            }
        );
    }

    public saveExistingSiteLog(formValue: any) {

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
                    this.isLoading = false;
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
                    this.isLoading = false;
                    console.error(error);
                    this.dialogService.showErrorMessage('Error in saving SiteLog data for ' + this.siteId);
                }
            );
    }

    public saveNewSiteLog(formValue: any) {

        _.merge(this.siteLogModel, formValue);
        this.removeDeletedItems();

        this.siteLogService.saveNewSiteLog(this.siteLogModel)
            .takeUntil(this.unsubscribe)
            .subscribe(
                (responseJson: any) => {
                    this.isLoading = false;
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

                    this.dialogService.showSuccessMessage('Done in saving new site log data');
                    this.dialogService.showNotificationDialog(
                        `Thank you for requesting a new site. You will be contacted by a member
                         from the GNSS Operations Team at Geoscience Australia regarding your request.`,
                        () => this.goToHomePage()
                    );
                },
                (error: Error) => {
                    this.isLoading = false;
                    console.error(error);
                    this.dialogService.showErrorMessage('Error in saving new site log data');
                }
            );
    }

    /**
     * Navigate to the default home page (Select-Site tab)
     */
    public goToHomePage() {
        let link = ['/'];
        this.router.navigate(link);
        this.isLoading = false;
    }

    /**
     * Popup a dialog prompting users whether or not to save changes if any before closing the site-log page
     */
    public confirmCloseSiteLogPage(): Promise<boolean> {
        let msg: string = 'You have made changes to the ${this.siteId} Site Log. \
            Closing the page will lose any unsaved changes.';
        return new Promise<boolean>((resolve, reject) => {
        this.dialogService.confirmCloseDialog(msg,
            () => {
                this.dialogService.showLogMessage('Site Log page closed without saving changes made.');
                resolve(true);
            },
            () => {
                this.dialogService.showLogMessage('Close cancelled');
                resolve(false);
            }
        );
      });
    }

    /**
     * Shows a dialog prompting users to confirm reverting/reloading the page
     */
    public confirmRevert() {
        let msg: string = 'You have made changes to the Site Log. \
            Reverting will reload the page and will lose any unsaved changes.';

        this.dialogService.confirmRevertDialog(msg,
            () => {
                this.reverting = true;
                window.location.reload();
            },
            () => {
                this.dialogService.showLogMessage('Revert cancelled');
            }
        );
    }

    public isFormDirty(): boolean {
        return this.siteLogForm && this.siteLogForm.dirty;
    }

    public isFormInvalid(): boolean {
        return this.siteLogForm.invalid;
    }

    private setupForm() {
        this.siteLogForm = this.formBuilder.group({});
    }

    private setupAuthSubscription() {
        this.userAuthService.userLoadedEvent
            .takeUntil(this.unsubscribe)
            .subscribe((_: User) => {
                if (this.userAuthService.hasAuthorityToEditSite()) {
                    this.siteLogForm.enable();
                } else {
                    this.siteLogForm.disable();
                }
            });
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
    }

    private  returnAssociatedComparator(itemName: string): any {
        switch (itemName) {
            case 'siteLocation':
                console.warn(`createComparator - ${itemName} does not have a comparator`);
                // And this should never get called as it isn't an array
                return null;
            case 'siteIdentification':
                console.warn(`createComparator - ${itemName} does not have a comparator`);
                // And this should never get called as it isn't an array
                return null;
            case 'siteOwner':
                return ResponsiblePartyGroupComponent.compare;
            case 'siteContacts':
                return ResponsiblePartyGroupComponent.compare;
            case 'siteMetadataCustodian':
                return ResponsiblePartyGroupComponent.compare;
            case 'siteDataCenters':
                return ResponsiblePartyGroupComponent.compare;
            case 'siteDataSource':
                return ResponsiblePartyGroupComponent.compare;
            case 'gnssReceivers':
                return GnssReceiversGroupComponent.compare;
            case 'gnssAntennas':
                return GnssAntennaGroupComponent.compare;
            case 'frequencyStandards':
                return FrequencyStandardGroupComponent.compare;
            case 'humiditySensors':
                return HumiditySensorsGroupComponent.compare;
            case 'pressureSensors':
                return PressureSensorsGroupComponent.compare;
            case 'localEpisodicEffects':
                return LocalEpisodicEffectsGroupComponent.compare;
            case 'surveyedLocalTies':
                return SurveyedLocalTiesGroupComponent.compare;
            case 'temperatureSensors':
                return TemperatureSensorsGroupComponent.compare;
            case 'waterVaporSensors':
                return WaterVaporSensorsGroupComponent.compare;
            case 'radioInterferences':
                return RadioInterferenceGroupComponent.compare;
            case 'signalObstructions':
                return SignalObstructionGroupComponent.compare;
            case 'multipathSources':
                return MultipathSourceGroupComponent.compare;
            default:
                throw new Error(`Unknown item - unable to return comparator for item ${itemName}`);
        }
    }

    /**
     * Sort the the array items (eg. gnssAntennas) in the form data
     * @param formValue
     */
    private sortArrays(formValue: any) {
        let items: string[] = Object.keys(formValue);
        for (let item of items) {
            if (Array.isArray(formValue[item])) {
                let comparator: any = this.returnAssociatedComparator(item);
                if (comparator) {
                    formValue[item].sort(comparator);
                }
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
        let i: number;
        for (i = siteLogModelGroupItems.length - 1; i >= 0; i--) {
            if (siteLogModelGroupItems[i].isDeleted) {
                siteLogModelGroupItems.splice(i, 1);
            }
        }
    }
}

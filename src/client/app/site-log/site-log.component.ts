import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { User } from 'oidc-client';
import * as _ from 'lodash';

import { DialogService, MiscUtils, CorsSiteService, SiteLogService } from '../shared/index';
import { SiteLogViewModel }  from '../site-log/site-log-view-model';
import { SiteAdministrationModel } from '../site-administration/site-administration-model';
import { CorsNetworkModel } from '../shared/cors-network/cors-network-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { ApplicationSaveState } from '../shared/site-log/site-log.service';
import { ResponsiblePartyGroupComponent } from '../responsible-party/responsible-party-group.component';
import { GnssReceiversGroupComponent } from '../gnss-receiver/gnss-receivers-group.component';
import { CollocationInformationGroupComponent } from '../collocation-information/collocation-information-group.component';
import { FrequencyStandardGroupComponent } from '../frequency-standard/frequency-standard-group.component';
import { GnssAntennaGroupComponent } from '../gnss-antenna/gnss-antenna-group.component';
import { HumiditySensorsGroupComponent } from '../humidity-sensor/humidity-sensors-group.component';
import { PressureSensorsGroupComponent } from '../pressure-sensor/pressure-sensors-group.component';
import { LocalEpisodicEffectsGroupComponent } from '../local-episodic-effect/local-episodic-effects-group.component';
import { SurveyedLocalTiesGroupComponent } from '../surveyed-local-tie/surveyed-local-ties-group.component';
import { TemperatureSensorsGroupComponent } from '../temperature-sensor/temperature-sensors-group.component';
import { WaterVaporSensorsGroupComponent } from '../water-vapor-sensor/water-vapor-sensors-group.component';
import { OtherInstrumentationGroupComponent } from '../other-instrumentation/other-instrumentation-group.component';
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
    public corsSiteForm: FormGroup;
    public siteLogModel: SiteLogViewModel;
    public siteAdminModel: SiteAdministrationModel;
    public siteAdminModelOrigin: SiteAdministrationModel;
    public corsNetworkList: CorsNetworkModel[];
    public receiverAntennaCodeJson: any;

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
                private corsSiteService: CorsSiteService,
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
        this.route.data.subscribe((data: {siteLogModel: SiteLogViewModel,
                                          siteAdminModel: SiteAdministrationModel,
                                          corsNetworkList: CorsNetworkModel[],
                                          receiverAntennaCodeJson: any
                                        }) => {

            // if we already have a siteLogForm then this looks like a good place to reload the page
            // TODO possibly work out a way to clear out all the data instead
            if (this.siteLogForm) {
                window.location.reload();
            }

            this.corsNetworkList = data.corsNetworkList;
            this.siteAdminModel = data.siteAdminModel;
            this.siteAdminModelOrigin = _.cloneDeep(data.siteAdminModel);

            this.siteLogModel = data.siteLogModel;
            this.receiverAntennaCodeJson = data.receiverAntennaCodeJson;
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
        this.siteAdminModel = null;
    }

    /**
     * Save changes made back to siteLog XML
     */
    public save() {
        if (!this.siteLogService.isUserAuthorisedToEditSite.value) {
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
                let formValueClone: any = _.cloneDeep(this.siteLogForm.getRawValue());
                this.moveSiteInformationUp(formValueClone);
                this.sortArrays(formValueClone);
                console.log(' formValue before merge and after reverse: ', formValueClone);

                if (this.siteId !== 'newSite') {
                    this.saveExistingSiteLog(formValueClone);
                    this.saveExistingCorsSite();
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
        if (!this.siteLogForm.dirty) {
            return;
        }

        this.isLoading = true;
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

        this.isLoading = true;
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

    /*
     * Update CORS site properties if changed, including siteStatus (data permission) and networks
     */
    public saveExistingCorsSite() {
        if (!this.siteLogService.isUserAuthorisedToEditSite.value || !this.corsSiteForm.dirty) {
            return;
        }

        let observables = this.getCorsSiteHttpObservables();
        if (observables.length > 0) {
            this.isLoading = true;
            this.updateCorsSiteProperties(observables);
        }
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
        return this.siteLogForm.dirty || this.corsSiteForm.dirty;
    }

    public isFormInvalid(): boolean {
        return this.siteLogForm.invalid || this.corsSiteForm.invalid;
    }

    private setupForm() {
        this.corsSiteForm = this.formBuilder.group({});
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

        this.corsSiteForm.valueChanges.debounceTime(500)
            .takeUntil(this.unsubscribe)
            .subscribe((value: any) => {
                this.siteLogService.sendApplicationStateMessage({
                    applicationFormModified: this.corsSiteForm.dirty,
                    applicationFormInvalid: this.corsSiteForm.invalid,
                    applicationSaveState: ApplicationSaveState.idle
                });
            });

        this.corsSiteForm.statusChanges.debounceTime(500)
            .takeUntil(this.unsubscribe)
            .subscribe((value: any) => {
                this.siteLogService.sendApplicationStateMessage({
                    applicationFormModified: this.corsSiteForm.dirty,
                    applicationFormInvalid: this.corsSiteForm.invalid,
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

                //this.userAuthService.isSuperuser().subscribe(superuser => {
                    if (this.userAuthService.isSuperuser()) {
                        this.corsSiteService.isSuperuser.next(true);
                        this.corsSiteForm.enable();
                    } else {
                        this.corsSiteService.isSuperuser.next(false);
                        this.corsSiteForm.disable();
                    }
                //});
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
            case 'siteAdministration':
                console.warn(`createComparator - ${itemName} does not have a comparator`);
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
            case 'collocationInformation':
                return CollocationInformationGroupComponent.compare;
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
            case 'otherInstrumentation':
                return OtherInstrumentationGroupComponent.compare;
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

    private getCorsSiteHttpObservables(): Observable<Response>[] {
        let observables: Observable<Response>[] = [];

        // Save site status (data permission) if changed
        let newSiteStatus = this.corsSiteForm.getRawValue().siteAdministration.siteStatus;
        if (this.siteAdminModel.siteStatus !== newSiteStatus) {
            this.siteAdminModel.siteStatus = newSiteStatus;
            observables.push(this.corsSiteService.updateCorsSite(this.siteAdminModel));
        }

        let networkAddList = _.differenceBy(this.siteAdminModel.corsNetworks, this.siteAdminModelOrigin.corsNetworks, 'id');
        networkAddList.forEach((network: CorsNetworkModel) => {
            observables.push(this.corsSiteService.updateNetwork(this.siteAdminModel.addToNetworkHref, network.id));
        });

        let networkRemoveList = _.differenceBy(this.siteAdminModelOrigin.corsNetworks, this.siteAdminModel.corsNetworks, 'id');
        networkRemoveList.forEach((network: CorsNetworkModel) => {
            observables.push(this.corsSiteService.updateNetwork(this.siteAdminModel.removeFromNetworkHref, network.id));
        });

        return observables;
    }

    /*
     * Update CORS site properties by recursively/sequentially invoking HTTP client service for each property to be changed
     *
     */
    private updateCorsSiteProperties(observables: Observable<Response>[]) {
        let observable = _.head(observables);
        if (!observable) {
            this.dialogService.showSuccessMessage('Done in updating CORS site properties');
            this.siteAdminModelOrigin = _.cloneDeep(this.siteAdminModel);
            this.resetFormStatusAfterSave();
        } else {
            observable.subscribe(
                (response: Response) => {
                    if (response.status === 200) {
                        this.updateCorsSiteProperties(_.tail(observables));
                    } else {
                        this.handleError('Response status: ' + response.status + ' - ' + response.statusText);
                    }
                },
                (error: Error) => {
                    this.handleError(error.message);
                }
            );
        }
    }

    private handleError(message: string) {
        this.isLoading = false;
        console.error(message);
        this.dialogService.showErrorMessage(message);
        throw new Error(message);
    }

    private resetFormStatusAfterSave() {
        this.isLoading = false;
        this.siteLogForm.markAsPristine();
        this.corsSiteForm.markAsPristine();
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

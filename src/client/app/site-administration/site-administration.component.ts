import { Component, ChangeDetectorRef, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { User } from 'oidc-client';
import * as _ from 'lodash';

import { CorsSiteService, CorsNetworkService, DialogService, SiteLogService } from '../shared/index';
import { CorsNetworkModel } from '../shared/cors-network/cors-network-model';
import { SiteAdministrationModel } from './site-administration-model';
import { RadioButtonOption } from '../shared/form-input/radiobuttons-input.component';
import { ApplicationSaveState } from '../shared/site-log/site-log.service';
import { UserAuthService } from '../shared/global/user-auth.service';

/**
 * This class represents the SiteAdministrationComponent for viewing and editing the details of
 * siteAdministration (including siteStatus and corsNetworks) for super users only.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-site-administration',
    templateUrl: 'site-administration.component.html',
})
export class SiteAdministrationComponent implements OnInit, OnDestroy {
    public sitePermissionList: RadioButtonOption[] = [
        {
            label: 'Open Data',
            value: 'PUBLIC',
            tips: 'Access to data from these stations is open to anyone for access, use or sharing.'
        },
        {
            label: 'Closed Data',
            value: 'PRIVATE',
            tips: 'Access to data from these stations is restricted to APREF analysis centres'
                    + ' and use within AUSPOS. The data cannot be shared.'
        },
    ];

    @Input() parentForm: FormGroup;
    @Input() siteId: string;
    @Input() corsNetworkList: CorsNetworkModel[];
    @Input() siteAdminModel: SiteAdministrationModel;
    @Output() runningStatusEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

    public siteAdministrationForm: FormGroup;
    public isFormOpen: boolean = false;
    public isSiteStatusPanelOpen: boolean = true;
    public isNetworkPanelOpen: boolean = true;

    private subscription: Subscription;
    private unsubscribe: Subject<void> = new Subject<void>();
    private siteAdminModelOrigin: SiteAdministrationModel;

    /**
     * Creates an instance of the SiteAdministration Component.
     */
    constructor(private formBuilder: FormBuilder,
                private dialogService: DialogService,
                private siteLogService: SiteLogService,
                private corsSiteService: CorsSiteService,
                private corsNetworkService: CorsNetworkService,
                private userAuthService: UserAuthService,
                private changeDetectionRef: ChangeDetectorRef) {
    }

    /**
     * Initialise all data on loading the site-log page
     */
    public ngOnInit() {
        this.siteAdminModel.mapNetworkNames(this.corsNetworkList);
        this.setupForm();
        this.setupSubscriptions();
        this.siteAdminModelOrigin = _.cloneDeep(this.siteAdminModel);
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
        if (this.subscription)
            this.subscription.unsubscribe();
    }

    public getControlName(): string {
        return 'siteAdministration';
    }

    public isFormDirty(): boolean {
        return this.siteAdministrationForm && this.siteAdministrationForm.dirty;
    }

    public isFormInvalid(): boolean {
        return this.siteAdministrationForm.invalid;
    }

    public toggleSiteStatusPanel() {
        this.isSiteStatusPanelOpen = !this.isSiteStatusPanelOpen;
    }

    public toggleNetworkPanel() {
        this.isNetworkPanelOpen = !this.isNetworkPanelOpen;
    }

    /*
     * Update CORS site properties if changed, including siteStatus (data permission) and networks
     */
    public save() {
        if (this.siteId === 'newSite') {
            this.resetFormStatusAfterSave();
            return;
        } else if (!this.siteLogService.isUserAuthorisedToEditSite.value || !this.siteAdministrationForm.dirty) {
            return;
        }

        let observables = this.getCorsSiteHttpObservables();
        if (observables.length > 0) {
            this.startRunning();
            this.updateCorsSiteProperties(observables);
        }
    }

    private setupForm() {
        this.siteAdministrationForm = this.formBuilder.group({
            siteStatus: [this.siteAdminModel.siteStatus, [Validators.maxLength(10)]],
            corsNetworks: [this.siteAdminModel.corsNetworks],
        });

        this.subscription = this.corsSiteService.isSuperuser.subscribe(superuser => {
            if (superuser) {
                this.siteAdministrationForm.enable();
            } else {
                this.siteAdministrationForm.disable();
            }
        });

        this.parentForm.addControl('siteAdministration', this.siteAdministrationForm);
    }

    /**
     * Template and Model driven forms are handled differently and separately
     */
    private setupSubscriptions() {
        this.siteAdministrationForm.valueChanges.debounceTime(500)
            .takeUntil(this.unsubscribe)
            .subscribe((value: any) => {
                this.siteLogService.sendApplicationStateMessage({
                    applicationFormModified: this.siteAdministrationForm.dirty,
                    applicationFormInvalid: this.siteAdministrationForm.invalid,
                    applicationSaveState: ApplicationSaveState.idle
                });
            });

        this.siteAdministrationForm.statusChanges.debounceTime(500)
            .takeUntil(this.unsubscribe)
            .subscribe((value: any) => {
                this.siteLogService.sendApplicationStateMessage({
                    applicationFormModified: this.siteAdministrationForm.dirty,
                    applicationFormInvalid: this.siteAdministrationForm.invalid,
                    applicationSaveState: ApplicationSaveState.idle
                });
            });

        this.userAuthService.user
            .takeUntil(this.unsubscribe)
            .subscribe((_: User) => {
                if (this.userAuthService.isSuperuser()) {
                    this.corsSiteService.isSuperuser.next(true);
                    this.siteAdministrationForm.enable();
                } else {
                    this.corsSiteService.isSuperuser.next(false);
                    this.siteAdministrationForm.disable();
                }
        });
    }

    private getCorsSiteHttpObservables(): Observable<Response>[] {
        let observables: Observable<Response>[] = [];

        // Save site status (data permission) if changed
        let newSiteStatus = this.siteAdministrationForm.getRawValue().siteStatus;
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
        this.stopRunning();
        console.error(message);
        this.dialogService.showErrorMessage(message);
        throw new Error(message);
    }

    private resetFormStatusAfterSave() {
        this.stopRunning();
        this.siteAdministrationForm.markAsPristine();
        this.siteLogService.sendApplicationStateMessage({
            applicationFormModified: false,
            applicationFormInvalid: false,
            applicationSaveState: ApplicationSaveState.idle
        });
    }

    private startRunning() {
        this.runningStatusEmitter.emit(true);
    }

    private stopRunning() {
        this.runningStatusEmitter.emit(false);
    }
}

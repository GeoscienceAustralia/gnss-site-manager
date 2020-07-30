import { Component, OnInit, OnDestroy, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DialogService, SiteLogService } from '../shared/index';
import { SiteLogViewModel }  from '../site-log/site-log-view-model';
import { SiteAdministrationModel } from '../site-administration/site-administration-model';
import { CorsNetworkModel } from '../shared/cors-network/cors-network-model';
import { ApplicationSaveState } from '../shared/site-log/site-log.service';
import { SiteLogComponent } from '../site-log/site-log.component';
import { SiteAdministrationComponent } from '../site-administration/site-administration.component';

/**
 * This class represents the SiteComponent for viewing and editing the details of a GNSS site,
 *  including site log, site access permission and networks.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-site',
    templateUrl: 'site.component.html'
})
export class SiteComponent implements OnInit, OnDestroy {
    public siteForm: FormGroup;
    public siteLogModel: SiteLogViewModel;
    public siteAdminModel: SiteAdministrationModel;
    public corsNetworkList: CorsNetworkModel[];
    public antennaRadomeCodelist: string[];
    public receiverCodelist: string[];

    private siteId: string;
    private isLoading: boolean = false;
    private reverting: boolean = false;

    @ViewChild(SiteLogComponent)
    private siteLogComponent: SiteLogComponent;

    @ViewChild(SiteAdministrationComponent)
    private siteAdminComponent: SiteAdministrationComponent;

    /**
     * Creates an instance of the SiteComponent with the injected services.
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
            if (this.siteId && this.siteId !== 'newSite') {
                this.siteId = this.siteId.toUpperCase();
            }
        });

        this.isLoading = true;
        this.route.data.subscribe((data: {siteLogModel: SiteLogViewModel,
                                          siteAdminModel: SiteAdministrationModel,
                                          corsNetworkList: CorsNetworkModel[],
                                          antennaRadomeCodelist: string[],
                                          receiverCodelist: string[]}) => {
            // if we already have a siteForm then this looks like a good place to reload the page
            // TODO possibly work out a way to clear out all the data instead
            if (this.siteForm) {
                window.location.reload();
            }

            this.corsNetworkList = data.corsNetworkList;
            this.siteAdminModel = data.siteAdminModel;
            this.siteLogModel = data.siteLogModel;
            this.antennaRadomeCodelist = data.antennaRadomeCodelist;
            this.receiverCodelist = data.receiverCodelist;

            this.setupForm();
            this.siteLogService.sendApplicationStateMessage({
                applicationFormModified: false,
                applicationFormInvalid: false,
                applicationSaveState: ApplicationSaveState.idle
            });
            this.isLoading = false;
            this.dialogService.showSuccessMessage('Site data loaded successfully for ' + this.siteId);
        });
    }

    /**
     * Clear all variables/arrays
     */
    public ngOnDestroy() {
        this.isLoading = false;
        this.siteId = null;
        this.siteLogModel = null;
        this.siteAdminModel = null;
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
     * Save changes made back to siteLog XML and CORS site/networks
     */
    public save() {
        if (!this.siteLogService.isUserAuthorisedToEditSite.value) {
            console.warn('Cannot save the site data - user does not have edit rights');
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
                this.siteLogComponent.save();
                this.siteAdminComponent.save();
            },
            () => {
                this.dialogService.showLogMessage('Cancelled in saving data for Site ' + this.siteId);
                this.isLoading = false;
            }
        );
    }

    /**
     * Popup a dialog prompting users whether or not to save changes if any before closing the site page
     */
    public confirmCloseSitePage(): Promise<boolean> {
        let msg: string = 'You have made changes to the site: ${this.siteId}. \
            Closing the page will lose any unsaved changes.';
        return new Promise<boolean>((resolve, reject) => {
        this.dialogService.confirmCloseDialog(msg,
            () => {
                this.dialogService.showLogMessage('Site page closed without saving changes made.');
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
        let msg: string = 'You have made changes to the site. \
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
        return this.siteForm.dirty;
    }

    public isFormInvalid(): boolean {
        return this.siteForm.invalid;
    }

    public updateLoadingStatus(loading: boolean) {
        this.isLoading = loading;
    }

    private setupForm() {
        this.siteForm = this.formBuilder.group({});
    }
}

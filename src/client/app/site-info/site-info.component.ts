import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'oidc-client';
import { ConstantsService, DialogService, MiscUtils,
         SiteLogService, JsonDiffService, JsonCheckService } from '../shared/index';
import { SiteLogViewModel, ViewSiteLog } from '../shared/json-data-view-model/view-model/site-log-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { ResponsiblePartyType, ResponsiblePartyGroupComponent } from '../responsible-party/responsible-party-group.component';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import * as _ from 'lodash';
import { GnssReceiversGroupComponent } from '../gnss-receiver/gnss-receivers-group.component';
import { FrequencyStandardGroupComponent } from '../frequency-standard/frequency-standard-group.component';
import { GnssAntennaGroupComponent } from '../gnss-antenna/gnss-antenna-group.component';
import { HumiditySensorsGroupComponent } from '../humidity-sensor/humidity-sensors-group.component';
import { PressureSensorsGroupComponent } from '../pressure-sensor/pressure-sensors-group.component';
import { LocalEpisodicEffectsGroupComponent } from '../local-episodic-effect/local-episodic-effects-group.component';
import { SurveyedLocalTiesGroupComponent } from '../surveyed-local-tie/surveyed-local-ties-group.component';
import { TemperatureSensorsGroupComponent } from '../temperature-sensor/temperature-sensors-group.component';
import { WaterVaporSensorsGroupComponent } from '../water-vapor-sensor/water-vapor-sensors-group.component';

/**
 * This class represents the SiteInfoComponent for viewing and editing the details of site/receiver/antenna.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-site-info',
  templateUrl: 'site-info.component.html'
})
export class SiteInfoComponent implements OnInit, OnDestroy {
    public miscUtils: any = MiscUtils;
    // public siteContactName: string = ConstantsService.SITE_CONTACT;
    // public siteMetadataCustodianName: string = ConstantsService.SITE_METADATA_CUSTODIAN;
    // public siteDataCenterName: string = ConstantsService.SITE_DATA_CENTER;
    // public siteDataSourceName: string = ConstantsService.SITE_DATA_SOURCE;
    public siteInfoForm: FormGroup;                 // model driven forms
    public hasEditRole: boolean = false;
    // public formIsDirty: boolean = false;    // Necessary as need to compose dirty of template and model forms

    // private SITE_CONTACT: ResponsiblePartyType = ResponsiblePartyType.siteContact;
    public responsiblePartyType: any = ResponsiblePartyType;
    public siteLogOrigin: ViewSiteLog;
    public siteLogModel: ViewSiteLog;

    private siteId: string;
  private isLoading: boolean = false;
  private siteIdentification: any = null;
  private siteLocation: any = {};
  private siteContacts: Array<any> = [];
  // private siteMetadataCustodian: any = {};
  // private siteDataCenters: Array<any> = [];
  // private siteDataSource: any = {};
  private errorMessage: string;
  private siteInfoTab: any = null;
  private submitted: boolean = false;
    private status: any = {
        oneAtATime: false,
        isSiteInfoGroupOpen: true,
        isSiteMediaOpen: false,
        isMetaCustodianOpen: false,
        // hasNewSiteContact: false,
        // hasNewSiteMetadataCustodian: false,
        // hasNewSiteDataCenter: false,
        // hasNewSiteDataSource: false,
    };

    private authSubscription: Subscription;

  /**
   * Creates an instance of the SiteInfoComponent with the injected Router/ActivatedRoute/CorsSite Services.
   *
   * @param {Router} router - The injected Router.
   * @param {ActivatedRoute} route - The injected ActivatedRoute.
   * @param {DialogService} dialogService - The injected DialogService.
   * @param {SiteLogService} siteLogService - The injected SiteLogService.
   * @param {JsonDiffService} jsonDiffService - The injected JsonDiffService.
   */
  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialogService: DialogService,
              private siteLogService: SiteLogService,
              private jsonDiffService: JsonDiffService,
              private jsonCheckService: JsonCheckService,
              private userAuthService: UserAuthService,
              private formBuilder: FormBuilder,
              private _changeDetectionRef : ChangeDetectorRef) {
  }

  /**
   * Initialise all data on loading the site-info page
   */
  public ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id: string = params['id'];
      this.siteId = id;
    });

    this.authSubscription = this.setupAuthSubscription();
    this.hasEditRole = this.userAuthService.hasAuthorityToEditSite(this.siteId);
    this.setupForm();
    this.loadSiteInfoData();
    this.setupSubscriptions();
  }

   /**
   * Retrieve relevant site/setup/log information from DB based on given Site Id
   */
  public loadSiteInfoData() {
    // Do not allow direct access to site-info page
    if (!this.siteId) {
      this.goToHomePage();
    }

    this.isLoading = true;
    this.submitted = false;

    this.siteInfoTab = this.route.params.subscribe(() => {
        this.removeAllExistingControlItems();
      this.siteLogService.getSiteLogByFourCharacterIdUsingGeodesyML(this.siteId).subscribe(
        (responseJson: any) => {
          // this.siteLogModel = this.jsonCheckService.getValidSiteLog(responseJson.siteLog);//['geo:siteLog']);
          this.siteLogModel = responseJson.siteLog;
          console.debug('loadSiteInfoData - siteLogModel: ', this.siteLogModel);

          this.backupSiteLogJson();
          this.isLoading = false;
            this.siteLogService.sendFormModifiedStateMessage(false);
          this.dialogService.showSuccessMessage('Site log info loaded successfully for ' + this.siteId);
        },
        (error: Error) =>  {
          this.errorMessage = <any>error;
          this.isLoading = false;
          this.dialogService.showErrorMessage('No site log info found for ' + this.siteId);
        }
      );
    });
  }

  /**
   * Clear all variables/arrays
   */
  public ngOnDestroy() {
    this.isLoading =  false;
    this.hasEditRole = false;
    this.siteId = null;
    this.siteLogModel = null;
    this.siteIdentification = null;
    this.siteLocation = null;
    this.siteContacts.length = 0;
    // this.siteMetadataCustodian = null;
    // this.siteDataCenters.length = 0;
    // this.siteDataSource = null;
    this.status = null;
    this.errorMessage = '';
    if (this.authSubscription) {
        this.authSubscription.unsubscribe();
    }

    // It seems that ngOnDestroy is called when the object is destroyed, but ngOnInit isn't called every time an
    // object is created.  Hence this field might not have been created.
    if (this.siteInfoTab !== undefined && this.siteInfoTab !== null) {
      this.siteInfoTab.unsubscribe();
    }
  }

  /**
   * Save changes made back to siteLog XML
   */
  public save(formValue: any) {
      if (! formValue) {
          // Currently the toolbar save will pass null.  Just use siteInfoForm
          if (this.siteInfoForm.pristine) {
              return;
          }
          formValue = this.siteInfoForm.value;
      }

      console.log(' siteLog before form merge: ', this.siteLogModel);
      console.log(' formValue before merge and reverse: ', formValue);
      let formValueClone: any =_.cloneDeep(formValue);

      /* Get the arrays in the form in the same order as the SiteLogModel */
      this.sortArrays(formValueClone);
      console.log(' formValue before merge and after reverse: ', formValueClone);

      /* Apply any new values from the form to the SiteLogModel.  NOTE that when any new items were created
        an inital copy was added to the SiteLogModel and SiteLogOrigin.  And in the form model too of course. */
      _.merge(this.siteLogModel, formValueClone);
      console.log(' siteLog after form merge: ', this.siteLogModel);
      console.log(' siteLogOrigin: ', this.siteLogOrigin);

    let diffMsg: string = this.jsonDiffService.getJsonDiffHtml(this.siteLogOrigin, this.siteLogModel);

    if ( diffMsg === null || diffMsg.trim() === '') {
      this.dialogService.showLogMessage('No changes have been made for ' + this.siteId + '.');
        this.siteLogService.sendFormModifiedStateMessage(false);
        return;
    }

    // let that: any = this;

    this.dialogService.confirmSaveDialog(diffMsg, () => {
      // function() {
        this.isLoading = true;
        this.submitted = true;
        // this.status.hasNewSiteContact = false;
        // this.status.hasNewSiteMetadataCustodian = false;
        // this.status.hasNewSiteDataCenter = false;
        // this.status.hasNewSiteDataSource = false;
        let siteLogViewModel: SiteLogViewModel  = new SiteLogViewModel();
        siteLogViewModel.siteLog=this.siteLogModel;
        this.siteLogService.saveSiteLog(siteLogViewModel).subscribe(
          (responseJson: any) => {
            //if (form)form.pristine = true;  // Note: pristine has no setter method in ng2-form!
            this.isLoading = false;
              this.siteLogService.sendFormModifiedStateMessage(false);
              this.backupSiteLogJson();
            this.dialogService.showSuccessMessage('Done in saving SiteLog data for '+this.siteId);
          },
          (error: Error) =>  {
            this.isLoading = false;
            this.errorMessage = <any>error;
            console.error(error);
            this.dialogService.showErrorMessage('Error in saving SiteLog data for '+this.siteId);
          }
        );
      },
      () => {
        this.dialogService.showLogMessage('Cancelled in saving SiteLog data for '+this.siteId);
        this.isLoading = false;
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
   * Return true if any of the SiteLog data have been changed.
   *
   * TODO: we may use other methods to detect changes, e.g., the form.$dirty variable
   */
  public hasChanges(): boolean {
    return this.jsonDiffService.isDiff(this.siteLogOrigin, this.siteLogModel);
  }

  /**
   * Popup a dialog prompting users whether or not to save changes if any before closing the site-info page
   */
  public confirmCloseSiteInfoPage(): Promise<boolean> {
    let msg: string = `You have made changes to the ${this.siteId} Site Log. Close the page will lose any unsaved changes.`;
    let that: any = this;
    return new Promise<boolean>((resolve, reject) => {
        this.dialogService.confirmCloseDialog(msg,
          function() {
            that.dialogService.showLogMessage('Site Info page closed without saving changes made.');
            resolve(true);
          },
          function() {
            resolve(false);
          }
        );
    });
  }

  public backupSiteLogJson() {
    this.siteLogOrigin = MiscUtils.cloneJsonObj(this.siteLogModel);
  }

    private setupForm() {
        this.siteInfoForm = this.formBuilder.group({
        });
    }

    private setupAuthSubscription(): Subscription {
        return this.userAuthService.userLoadededEvent.subscribe((user: User) => {
            this.hasEditRole = this.userAuthService.hasAuthorityToEditSite(this.siteId);
        });
    }

    /**
     * Template and Model driven forms are handled differently and separately
     */
    private setupSubscriptions() {
        this.siteInfoForm.valueChanges.debounceTime(500).subscribe((value: any) => {
            if (this.siteInfoForm.dirty) {
                this.siteLogService.sendFormModifiedStateMessage(true);
                console.log('form dirty - yes: ', value);
                console.log('  and siteLogModel: ', this.siteLogModel);
            } else {
                this.siteLogService.sendFormModifiedStateMessage(false);
                console.log('form dirty - no');
            }
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
            case 'siteContact':
                return ResponsiblePartyGroupComponent.compare;
            case 'siteMetadataCustodian':
                return ResponsiblePartyGroupComponent.compare;
            // case 'siteDataCenter':
            //     return ResponsiblePartyGroupComponent.compare;
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
            default:
                throw new Error(`Unknown item - unable to return comparator for item ${itemName}`);
        }
    }

    /**
     * The array items in the form data (eg. gnssAntennas) need to be sorted according to the app desired order
     * (see AbstractGroup / sortingDirectionAscending.  It will likely always be descending so that is how it is seen in the form.
     * @param formValue
     */
    private sortArrays(formValue: any) {
        let items: string[] = Object.keys(formValue);
        for (let item of items) {
            if (Array.isArray(formValue[item])) {
                let comparator: any = this.returnAssociatedComparator(item);
                if (comparator) {
                    formValue[item].sort(comparator);//this.compare);
                }
            }
        }
    }

    /**
     * When we reload / revert the SiteLog, all existing form items need to be removed so they can be recreated (or else get multiples).
     * At this stage only concerned about arrays of Items that are in Groups
     */
    private removeAllExistingControlItems() {
        let keys: string[] = Object.keys(this.siteInfoForm.controls);
        for (let key of keys) {
            if (Array.isArray(this.siteInfoForm.controls[key].value)) {
                console.debug(`removeAllExistingControlItems - ${key} - size ${(<FormArray> this.siteInfoForm.controls[key]).length}`);
                this.removeFormArrayItems(<FormArray> this.siteInfoForm.controls[key]);
                console.debug(`    size now - ${key} - size ${(<FormArray> this.siteInfoForm.controls[key]).length}`);
            }
        }
    }

    private removeFormArrayItems(formArrayControl: FormArray) {
        let itemNumber: number = formArrayControl.length;
        for (; itemNumber >= 0; itemNumber--) {
            formArrayControl.removeAt(itemNumber);
        }
    }
}

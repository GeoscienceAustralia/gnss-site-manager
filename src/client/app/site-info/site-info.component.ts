import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConstantsService, DialogService, MiscUtils,
         SiteLogService, JsonDiffService, JsonCheckService } from '../shared/index';
import {SiteLogViewModel} from '../shared/json-data-view-model/view-model/site-log-view-model';
import {UserAuthService} from '../shared/global/user-auth.service';

/**
 * This class represents the SiteInfoComponent for viewing and editing the details of site/receiver/antenna.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-site-info',
  templateUrl: 'site-info.component.html'
})
export class SiteInfoComponent implements OnInit, OnDestroy {
  private siteId: string;
  private isLoading: boolean = false;
  private siteLogOrigin: any = {};
  private siteLogModel: any = {};
  private siteIdentification: any = null;
  private siteLocation: any = {};
  private siteContacts: Array<any> = [];
  private siteMetadataCustodian: any = {};
  private siteDataCenters: Array<any> = [];
  private siteDataSource: any = {};
  private errorMessage: string;
  private siteInfoTab: any = null;
  private submitted: boolean = false;
  public miscUtils: any = MiscUtils;

  public siteContactName: string = ConstantsService.SITE_CONTACT;
  public siteMetadataCustodianName: string = ConstantsService.SITE_METADATA_CUSTODIAN;
  public siteDataCenterName: string = ConstantsService.SITE_DATA_CENTER;
  public siteDataSourceName: string = ConstantsService.SITE_DATA_SOURCE;

  private status: any = {
    oneAtATime: false,
    isSiteInfoGroupOpen: true,
    isSiteMediaOpen: false,
    isMetaCustodianOpen: false,
    hasNewSiteContact: false,
    hasNewSiteMetadataCustodian: false,
    hasNewSiteDataCenter: false,
    hasNewSiteDataSource: false,
  };

  /**
   * Creates an instance of the SiteInfoComponent with the injected Router/ActivatedRoute/CorsSite Services.
   *
   * @param {Router} router - The injected Router.
   * @param {ActivatedRoute} route - The injected ActivatedRoute.
   * @param {DialogService} dialogService - The injected DialogService.
   * @param {SiteLogService} siteLogService - The injected SiteLogService.
   * @param {JsonDiffService} jsonDiffService - The injected JsonDiffService.
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private siteLogService: SiteLogService,
    private jsonDiffService: JsonDiffService,
    private jsonCheckService: JsonCheckService,
    private userAuthService: UserAuthService
  ) {}

  /**
   * Initialise all data on loading the site-info page
   */
  public ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id: string = params['id'];
      this.siteId = id;
    });

    this.loadSiteInfoData();
  }

  /**
   * Retrieve relevant site/setup/log information from DB based on given Site Id
   */
  public loadSiteInfoData() {
    // Do not allow direct access to site-info page
    if (!this.siteId) {
      this.goBack();
    }

    this.isLoading =  true;
    this.submitted = false;

    this.siteInfoTab = this.route.params.subscribe(() => {
      this.siteLogService.getSiteLogByFourCharacterIdUsingGeodesyML(this.siteId).subscribe(
        (responseJson: any) => {
          this.siteLogModel = this.jsonCheckService.getValidSiteLog(responseJson.siteLog);//['geo:siteLog']);
          this.siteIdentification = this.siteLogModel.siteIdentification;
          this.siteLocation = this.jsonCheckService.getValidSiteLocation(this.siteLogModel.siteLocation);
          this.siteContacts = [];
          for (let contact of this.siteLogModel.siteContact) {
            this.siteContacts.push(this.jsonCheckService.getValidResponsibleParty(contact.ciResponsibleParty));
          }
          this.siteMetadataCustodian = this.jsonCheckService
                  .getValidResponsibleParty(this.siteLogModel.siteMetadataCustodian.ciResponsibleParty);
          this.siteDataCenters = [];
          for (let siteDataCenter of this.siteLogModel.siteDataCenter) {
            this.siteDataCenters.push(this.jsonCheckService.getValidResponsibleParty(siteDataCenter.ciResponsibleParty));
          }
          this.siteDataSource = !this.siteLogModel.siteDataSource.ciResponsibleParty ? null : this.jsonCheckService
                  .getValidResponsibleParty(this.siteLogModel.siteDataSource.ciResponsibleParty);

          this.backupSiteLogJson();
          this.isLoading = false;
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
    this.siteLogModel = null;
    this.siteIdentification = null;
    this.siteLocation = null;
    this.siteContacts.length = 0;
    this.siteMetadataCustodian = null;
    this.siteDataCenters.length = 0;
    this.siteDataSource = null;
    this.status = null;
    this.errorMessage = '';
    // It seems that ngOnDestroy is called when the object is destroyed, but ngOnInit isn't called every time an
    // object is created.  Hence this field might not have been created.
    if (this.siteInfoTab !== undefined && this.siteInfoTab !== null) {
      this.siteInfoTab.unsubscribe();
    }
  }

  /**
   * Save changes made back to siteLog XML
   */
  public save(form: any) {
    let diffMsg: string = this.jsonDiffService.getJsonDiffHtml(this.siteLogOrigin, this.siteLogModel);
    if ( diffMsg === null || diffMsg.trim() === '') {
      this.dialogService.showLogMessage('No changes have been made for ' + this.siteId + '.');
      return;
    }

    let that: any = this;

    this.dialogService.confirmSaveDialog(diffMsg,
      function() {
        that.isLoading = true;
        that.submitted = true;
        that.status.hasNewSiteContact = false;
        that.status.hasNewSiteMetadataCustodian = false;
        that.status.hasNewSiteDataCenter = false;
        that.status.hasNewSiteDataSource = false;
        let siteLogViewModel: SiteLogViewModel  = new SiteLogViewModel();
        siteLogViewModel.siteLog=that.siteLogModel;
        that.siteLogService.saveSiteLog(siteLogViewModel).subscribe(
          (responseJson: any) => {
            //if (form)form.pristine = true;  // Note: pristine has no setter method in ng2-form!
            that.isLoading = false;
            that.backupSiteLogJson();
            that.dialogService.showSuccessMessage('Done in saving SiteLog data for '+that.siteId);
          },
          (error: Error) =>  {
            that.isLoading = false;
            that.errorMessage = <any>error;
            that.dialogService.showErrorMessage('Error in saving SiteLog data for '+that.siteId);
          }
        );
      },
      function() {
        that.dialogService.showLogMessage('Cancelled in saving SiteLog data for '+that.siteId);
        that.isLoading = false;
      }
    );
  }

  /**
   * Close the site-info page and go back to the default home page (select-site tab)
   */
  public goBack() {
    this.isLoading =  false;
    this.siteId = null;
    let link = ['/'];
    this.router.navigate(link);
  }

  public backupSiteLogJson() {
    this.siteLogOrigin = MiscUtils.cloneJsonObj(this.siteLogModel);
  }

    isUserLoggedIn(): boolean {
      return this.userAuthService.getUserName() !== '';
    }
}

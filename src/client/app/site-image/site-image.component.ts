import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import { MiscUtils } from '../shared/global/misc-utils';
import { SiteLogService, ApplicationSaveState, ApplicationState } from '../shared/site-log/site-log.service';
import { AssociatedDocumentService } from '../shared/associated-document/associated-document.service';
import { AbstractBaseComponent } from '../shared/abstract-groups-items/abstract-base.component';
import { SiteLogViewModel }  from '../site-log/site-log-view-model';
import { SiteImageViewModel } from './site-image-view-model';
import { ImageObject } from '../shared/thumbnail-image/image-object';

/**
 * This class represents the SiteImage sub-component under the SiteInformation Component.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-site-image',
    templateUrl: 'site-image.component.html',
    styleUrls: ['site-image.component.css'],
})
export class SiteImageComponent extends AbstractBaseComponent implements OnInit, OnDestroy {

    @Input() parentForm: FormGroup;
    @Input() siteLogModel: SiteLogViewModel;
    @Input() siteId: string;

    public siteImageDefinitions = new Map<string, string>([
        ['ant_000', 'Antenna North Facing'],
        ['ant_090', 'Antenna East Facing'],
        ['ant_180', 'Antenna South Facing'],
        ['ant_270', 'Antenna West Facing'],
        ['ant_sn', 'Antenna Serial No'],
        ['rec_sn', 'Receiver Serial No'],
        ['ant_monu', 'Antenna Monument'],
        ['ant_bldg', 'Antenna Building'],
        ['ant_roof', 'Antenna Roof']
    ]);

    // Thumbnail image size
    public imageSize: any = {
        height: 150,
        width: 145,
    };

    public validImageExtensions = ['jpeg', 'jpg', 'gif', 'png'];

    public siteImagesForm: FormGroup;
    public imageUploadForm: FormGroup;
    public isUserAuthorisedToEdit: boolean = false;
    public isOpen: boolean = false;
    public isCurrentImgPanelOpen: boolean = false;
    public isHistoricImgPanelOpen: boolean = false;
    public isUploadPanelOpen: boolean = false;
    public useUploadMethod: boolean = true;
    public imagePreviewError: string;
    public imageUploadError: string;
    public miscUtils: any = MiscUtils;

    public newSiteImages: SiteImageViewModel[];
    public siteImagesDeleted: SiteImageViewModel[];
    public currentImageObjects: ImageObject[];
    public historicImageObjects: ImageObject[];

    public createdDate: string;
    public description: string;
    public fileReference: string = null;
    public selectedImageContent: string | File = null;
    public isUploading: boolean = false;

    private fileInputElem: HTMLInputElement;
    private imageFileSelected: File = null;
    private fileReader: FileReader;
    private subscription: Subscription;

    constructor(protected associatedDocumentService: AssociatedDocumentService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(siteLogService);
    }

    ngOnInit() {
        if (this.siteLogModel.siteInformation.siteImages === null) {
            this.siteLogModel.siteInformation.siteImages = [];
        }
        this.init();
        this.setupForm();
        this.processInputSiteImages();

        this.subscription = this.siteLogService.getApplicationState().subscribe((applicationState: ApplicationState) => {
            if (applicationState.applicationSaveState === ApplicationSaveState.saved) {
                this.init();
                this.imageUploadForm.controls['imageUrl'].setValue(null);
                this.imageUploadForm.controls['imageUrl'].markAsPristine();
                this.imageUploadForm.controls['createdDate'].markAsPristine();
            }
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.subscription.unsubscribe();
        this.currentImageObjects = [];
        this.historicImageObjects = [];
    }

    getItemName(): string {
        return 'Site Images';
    }

    getControlName(): string {
        return 'siteImages';
    }

    getElementName(): string {
        return _.kebabCase(this.getItemName());
    }

    public isFormDirty(): boolean {
        return this.siteImagesForm && this.siteImagesForm.dirty;
    }

    public isFormInvalid(): boolean {
        return this.siteImagesForm && this.siteImagesForm.invalid;
    }

    public isValidImage(): boolean {
        if (this.imagePreviewError) {
            return false;
        }

        if (this.useUploadMethod) {
            return  this.selectedImageContent !== null;
        } else {
            return this.fileReference !== null;
        }
    }

    public setImagePreviewErrorMessage(): void {
        this.imagePreviewError = 'Invalid image URL';
    }

    public canAddImage(): boolean {
        return this.imageUploadForm.valid && this.description && this.isValidImage();
    }

    public setupForm() {
        this.siteImagesForm = this.formBuilder.group({});
        this.parentForm.addControl(this.getControlName(), this.siteImagesForm);

        // Create an imageUpload form that is not attached to SiteLogForm
        this.imageUploadForm = this.formBuilder.group({
            useUploadMethod: [this.useUploadMethod],
            description: [this.description],
            imageUrl: [''],
            createdDate: [this.createdDate, [Validators.required]],
        });
        this.imageUploadForm.controls['useUploadMethod'].valueChanges.subscribe((value: boolean) => {
            this.useUploadMethod = value;
            this.resetImageUploadForm();
        });

        this.siteLogService.isUserAuthorisedToEditSite.subscribe(authorised => {
            if (authorised) {
                this.siteImagesForm.enable();
                this.imageUploadForm.enable();
                this.isUserAuthorisedToEdit = true;
            } else {
                this.siteImagesForm.disable();
                this.imageUploadForm.disable();
                this.isUserAuthorisedToEdit = false;
            }
        });
    }

    public processInputSiteImages(): void {
        this.currentImageObjects = [];
        this.historicImageObjects = [];

        this.sortSiteImagesByDescriptionAndCreatedDate('asc', 'desc');
        let siteImageDescriptionTypes = this.getSiteImageDefinitionValues();
        this.siteLogModel.siteInformation.siteImages.forEach((siteImage: SiteImageViewModel) => {
            let imageObj = new ImageObject(siteImage.name, siteImage.description, siteImage.fileReference,
                                           MiscUtils.formatDateTimeSimple(siteImage.createdDate));
            const index = siteImageDescriptionTypes.indexOf(siteImage.description);
            if (index > -1) {
                this.currentImageObjects.push(imageObj);
                siteImageDescriptionTypes.splice(index, 1);
            } else {
                this.historicImageObjects.push(imageObj);
            }
        });
    }

    public setImageDescription(value: string): void {
        this.imageUploadError = '';
        this.description = value;
    }

    public previewImageFile(imageInput: HTMLInputElement): void {
        this.fileInputElem = imageInput;
        this.selectedImageContent = null;
        this.imageUploadError = '';
        if (imageInput.files && imageInput.files[0]) {
            this.imageFileSelected = imageInput.files[0];
            this.fileReader = new FileReader();
            this.fileReader.readAsDataURL(this.imageFileSelected);
            this.fileReader.onload = (event: any) => {
                this.selectedImageContent = event.target.result;
            };
        }
    }

    public previewImageLink(event: any) {
        this.fileReference = '';
        this.imagePreviewError = null;
        this.imageUploadError = '';
        let imageUrl = this.imageUploadForm.controls['imageUrl'].value;
        let fileExtn = this.getFileExtension(imageUrl);
        if (_.indexOf(this.validImageExtensions, fileExtn) !== -1) {
            this.fileReference = imageUrl;
        } else {
            this.imagePreviewError = 'Invalid image URL';
        }
    }

    public uploadImageFile(): void {
        this.isUploading = true;
        this.imageUploadError = '';
        const newImageName = this.getNewImageName(this.imageFileSelected.name);
        this.associatedDocumentService.uploadDocument(newImageName, this.imageFileSelected)
            .subscribe((response: Response) => {
                const s3ObjectUrl = response.headers.get('location');
                if (!s3ObjectUrl) {
                    this.imageUploadError = 'Failed in uploading site image: returned file reference is empty.';
                } else {
                    let siteImage: SiteImageViewModel = new SiteImageViewModel();
                    siteImage.name = newImageName;
                    siteImage.description = this.description;
                    siteImage.setCreatedDate(this.createdDate);
                    siteImage.imageType = this.imageFileSelected.type;
                    siteImage.originalName = this.imageFileSelected.name;
                    siteImage.fileReference = s3ObjectUrl.replace(/"/g, '').replace('stack', 'host');
                    this.newSiteImages.push(siteImage);
                    this.siteLogModel.siteInformation.siteImages.push(siteImage);
                    this.resetImageUploadForm();
                }
            },
            (error: Error) => {
                this.imageUploadError = error.message;
            },
            () => {
                this.isUploading = false;
            });
    }

    public addImageLink(): void {
        let siteImage = new SiteImageViewModel();
        siteImage.name = this.getNewImageName(this.fileReference);
        siteImage.description = this.description;
        siteImage.setCreatedDate(this.createdDate);
        siteImage.imageType = 'image/' + this.getFileExtension(this.fileReference);
        siteImage.originalName = this.getOriginalImageName(this.fileReference);
        siteImage.fileReference = this.fileReference;
        this.newSiteImages.push(siteImage);
        this.siteLogModel.siteInformation.siteImages.push(siteImage);
        this.resetImageUploadForm();
    }

    public removeImageFromUploadList(imageIndex: number, imageName: string) {
        for (let i in this.siteLogModel.siteInformation.siteImages) {
            let siteImage = this.siteLogModel.siteInformation.siteImages[i];
            if (siteImage.name === imageName) {
                this.associatedDocumentService.deleteDocument(imageName).subscribe(
                    (response: Response) => {
                        this.newSiteImages.splice(imageIndex, 1);
                        this.siteLogModel.siteInformation.siteImages.splice(Number(i), 1);
                        if (this.newSiteImages.length === 0) {
                            this.siteImagesForm.markAsPristine();
                            this.siteLogService.sendApplicationStateMessage({
                                applicationFormModified: false,
                                applicationFormInvalid: false,
                                applicationSaveState: ApplicationSaveState.idle
                            });
                        }
                        console.log(imageName + ' has been removed from s3 bucket and upload list.');
                    },
                    (error: Error) => {
                        console.log('Error in removing ' + imageName + ' from upload list.');
                        console.error(error);
                    }
                );
                break;
            }
        }
    }

    public handleImageDeleteEvent(imageName: string) {
        for (let i in this.siteLogModel.siteInformation.siteImages) {
            let siteImage = this.siteLogModel.siteInformation.siteImages[i];
            if (siteImage.name === imageName) {
                this.siteImagesDeleted.push(siteImage);
                this.siteLogModel.siteInformation.siteImages.splice(Number(i), 1);
                this.siteImagesForm.markAsDirty();
                this.siteLogService.sendApplicationStateMessage({
                    applicationFormModified: true,
                    applicationFormInvalid: false,
                    applicationSaveState: ApplicationSaveState.idle
                });
                this.associatedDocumentService.deleteDocument(imageName).subscribe(
                    (response: Response) => {
                        console.log(imageName + ' has been deleted from s3 bucket');
                    },
                    (error: Error) => {
                        console.log('Error in deleting site image: ' + imageName);
                        console.error(error);
                    }
                );
                break;
            }
        }
    }

    public getSiteImageDefinitionValues(): string[] {
        return Array.from(this.siteImageDefinitions.values());
    }

    private init() {
        this.newSiteImages = [];
        this.siteImagesDeleted = [];
        this.description = null;
        this.fileReference = null;
        this.imagePreviewError = null;
        this.createdDate = MiscUtils.getUTCDateTime();
    }

    private resetImageUploadForm() {
        this.fileReference = null;
        this.imageFileSelected = null;
        this.imagePreviewError = null;
        this.selectedImageContent = null;
        this.description = null;

        if (this.useUploadMethod) {
            this.imageUploadForm.controls['imageUrl'].setValue(null);
            this.imageUploadForm.controls['imageUrl'].markAsPristine();
        } else {
            if (this.fileInputElem) {
                this.fileInputElem.value = '';
                console.log('2. this.useUploadMethod='+this.useUploadMethod);
            }
        }

        if (this.newSiteImages.length > 0) {
            this.siteImagesForm.markAsDirty();
            this.siteLogService.sendApplicationStateMessage({
                applicationFormModified: true,
                applicationFormInvalid: false,
                applicationSaveState: ApplicationSaveState.idle
            });
        }
    }

    private getOriginalImageName(url: string): string {
        return url.split('/').pop().split('\\').pop().split('?').pop().split('=').pop().split('#')[0];
    }

    private getNewImageName(originalImageName: string): string {
        this.createdDate = this.imageUploadForm.controls['createdDate'].value;
        return this.siteId + '_' + this.getMapKey(this.description) + '_'
            + MiscUtils.formatDateTimeString(this.createdDate) + '.'
            + this.getFileExtension(originalImageName);
    }

    private getMapKey(value: string): string {
        for (let key of Array.from(this.siteImageDefinitions.keys())) {
            if (this.siteImageDefinitions.get(key) === value) {
                return key;
            }
        }
        return null;
    }

    private getFileExtension(imagePath: string): string {
        if (!imagePath || imagePath.length < 4 || imagePath.lastIndexOf('.') === -1) {
            return null;
        }
        let index = imagePath.lastIndexOf('.');
        return imagePath.substring(index + 1).toLowerCase();
    }

    private sortSiteImagesByDescriptionAndCreatedDate(sort1: string, sort2: string): void {
        this.siteLogModel.siteInformation.siteImages.sort((previous: SiteImageViewModel, current: SiteImageViewModel) => {
            if (previous.description > current.description) {
                return sort1 === 'desc' ? -1 : 1;
            } else if (previous.description < current.description) {
                return sort1 === 'asc' ? -1 : 1;
            } else {
                if (previous.createdDate > current.createdDate) {
                    return sort2 === 'desc' ? -1 : 1;
                } else if (previous.createdDate < current.createdDate) {
                    return sort2 === 'asc' ? -1 : 1;
                } else {
                    return 0;
                }
            }
        });
    }
}

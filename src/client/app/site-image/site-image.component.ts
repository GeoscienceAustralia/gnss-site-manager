import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { SelectComponent } from 'ng2-select';
import * as _ from 'lodash';

import { MiscUtils } from '../shared/global/misc-utils';
import { SiteLogService, ApplicationSaveState, ApplicationState } from '../shared/site-log/site-log.service';
import { AssociatedDocumentService } from '../shared/associated-document/associated-document.service';
import { AbstractBaseComponent } from '../shared/abstract-groups-items/abstract-base.component';
import { SiteLogViewModel }  from '../site-log/site-log-view-model';
import { SiteImageViewModel } from './site-image-view-model';
import { ImageObject, ImageStatus } from '../shared/thumbnail-image/image-object';

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

    @ViewChild(SelectComponent)
    public ng2Select: SelectComponent;

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

    public siteImageForm: FormGroup;
    public currentImageForm: FormGroup;
    public previousImageForm: FormGroup;
    public addImageForm: FormGroup;

    public isOpen: boolean = false;
    public isCurrentImgPanelOpen: boolean = false;
    public isPreviousImgPanelOpen: boolean = false;
    public isAddNewPanelOpen: boolean = false;
    public useImageFileType: boolean = true;
    public isUserAuthorisedToEdit: boolean = false;
    public isCurrentImgPanelEditable: boolean = false;
    public isPreviousImgPanelEditable: boolean = false;

    public allImageObjects: ImageObject[];
    public currentImageObjects: ImageObject[];
    public previousImageObjects: ImageObject[];

    public description: string;
    public createdDate: string;
    public fileReference: string = null;
    public selectedImageContent: string = null;
    public imagePreviewError: string;
    public miscUtils: MiscUtils = MiscUtils;

    private selectedImageFile: File = null;
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
        this.initialise();
        this.setupForm();
        this.processInputSiteImages();

        this.subscription = this.siteLogService.getApplicationState()
                            .subscribe((applicationState: ApplicationState) => {
            if (applicationState.applicationSaveState === ApplicationSaveState.saved) {
                this.initialise();
                this.addImageForm.markAsPristine();
                this.processInputSiteImages();
            }
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.subscription.unsubscribe();
        this.currentImageObjects = [];
        this.previousImageObjects = [];
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
        return this.siteImageForm && this.siteImageForm.dirty;
    }

    public isFormInvalid(): boolean {
        return this.siteImageForm && this.siteImageForm.invalid;
    }

    public isValidImage(): boolean {
        if (this.imagePreviewError) {
            return false;
        }

        if (this.useImageFileType) {
            return  this.selectedImageContent !== null;
        } else {
            return this.fileReference !== null;
        }
    }

    public handleImagePreviewError(): void {
        if (this.fileReference) {
            this.imagePreviewError = 'Invalid image URL.';
        }
    }

    public canAddImage(): boolean {
        if (!this.addImageForm.valid || !this.description) {
            return false;
        }
        return this.isValidImage();
    }

    public addNew(event: UIEvent): void {
        event.preventDefault();
        this.isOpen = true;
        this.isAddNewPanelOpen = true;
        this.resetAddImageForm();
    }

    public closeAddNewPanel(): void {
        this.isAddNewPanelOpen = false;
    }

    public toggleCurrentImgPanelEditButton(): void {
        this.isCurrentImgPanelOpen = true;
        this.isCurrentImgPanelEditable = !this.isCurrentImgPanelEditable;
    }

    public togglePreviousImgPanelEditButton(): void {
        this.isPreviousImgPanelOpen = true;
        this.isPreviousImgPanelEditable = !this.isPreviousImgPanelEditable;
    }

    public setupForm(): void {
        this.siteImageForm = this.formBuilder.group({});
        this.currentImageForm = this.formBuilder.group({});
        this.previousImageForm = this.formBuilder.group({});
        this.siteImageForm.addControl('currentImages', this.currentImageForm);
        this.siteImageForm.addControl('previousImages', this.previousImageForm);
        this.parentForm.addControl(this.getControlName(), this.siteImageForm);

        // imageUpload form is not attached to SiteLogForm
        this.addImageForm = this.formBuilder.group({
            useImageFileType: [this.useImageFileType],
            description: [this.description],
            imageUrl: [''],
            createdDate: [this.createdDate, [Validators.required]],
        });
        this.addImageForm.controls['useImageFileType'].valueChanges.subscribe((value: boolean) => {
            this.useImageFileType = value;
            this.resetAddImageForm();
        });

        this.siteLogService.isUserAuthorisedToEditSite.subscribe((authorised: boolean) => {
            if (authorised) {
                this.siteImageForm.enable();
                this.addImageForm.enable();
                this.isUserAuthorisedToEdit = true;
            } else {
                this.siteImageForm.disable();
                this.addImageForm.disable();
                this.isUserAuthorisedToEdit = false;
            }
        });
    }

    public processInputSiteImages(): void {
        this.currentImageObjects = [];
        this.previousImageObjects = [];

        this.sortSiteImagesByDescriptionAndCreatedDate('asc', 'desc');
        let descriptionTypes = this.getSiteImageDefinitionValues();
        this.allImageObjects.forEach((imageObject: ImageObject) => {
            const index = descriptionTypes.indexOf(imageObject.title);
            if (index > -1) {
                this.currentImageObjects.push(imageObject);
                descriptionTypes.splice(index, 1);
            } else {
                this.previousImageObjects.push(imageObject);
            }
        });
    }

    public setImageDescription(value: string): void {
        this.description = value;
    }

    public getSiteImageDefinitionValues(): string[] {
        return Array.from(this.siteImageDefinitions.values());
    }

    public handleImageSelectEvent(imgFile: File): void {
        this.selectedImageContent = null;
        this.imagePreviewError = null;
        this.selectedImageFile = imgFile;
        if (imgFile && imgFile.type.includes('image/')) {
            this.fileReader = new FileReader();
            this.fileReader.readAsDataURL(this.selectedImageFile);
            this.fileReader.onload = (event: any) => {
                this.selectedImageContent = event.target.result;
            };
        } else {
            this.imagePreviewError = 'Invalid image file path.';
        }
    }

    public previewImageUrl(event: any): void {
        this.imagePreviewError = null;
        this.fileReference = this.addImageForm.controls['imageUrl'].value;
    }

    public addSiteImage(): void {
        let imageObject = new ImageObject(ImageStatus.NEW_IMAGE);
        imageObject.name = this.getNewImageName(this.selectedImageFile.name);
        imageObject.title = this.description;
        imageObject.createdDate = this.createdDate;
        imageObject.imageFile = this.selectedImageFile;
        imageObject.imageType = this.selectedImageFile.type;
        imageObject.setFileReference(this.selectedImageContent);
        this.allImageObjects.push(imageObject);
        this.markImageFormsAsDirty();
        this.processInputSiteImages();
        this.resetAddImageForm();
    }

    public addImageUrl(): void {
        let imageObject = new ImageObject(ImageStatus.NEW_URL);
        imageObject.name = this.getNewImageName(this.fileReference);
        imageObject.title = this.description;
        imageObject.setFileReference(this.fileReference);
        imageObject.createdDate = this.createdDate;
        imageObject.imageType = 'image/' + this.getFileExtension(this.fileReference);
        this.allImageObjects.push(imageObject);
        this.markImageFormsAsDirty();
        this.processInputSiteImages();
        this.resetAddImageForm();
    }

    public handleImageDeletionEvent(imageDeleted: ImageObject): void {
        for (let i in this.allImageObjects) {
            const index = Number(i);
            let imageObject = this.allImageObjects[index];
            if (imageObject.name === imageDeleted.name) {
                if (imageDeleted.status === ImageStatus.CANCEL) {
                    this.allImageObjects.splice(index, 1);
                    this.markFormAsPristine();
                } else if (imageDeleted.status === ImageStatus.OK
                        || imageDeleted.status === ImageStatus.INVALID) {
                    this.markFormAsPristine();
                } else {
                    imageObject.status = imageDeleted.status;
                    this.markImageFormsAsDirty();
                }
                break;
            }
        };
        this.processInputSiteImages();
    }

    public save(): Observable<boolean> {
        this.siteLogModel.siteInformation.siteImages = [];
        let pendingImageObjects: ImageObject[] = [];
        this.allImageObjects.forEach((imageObject: ImageObject) => {
            if ([ImageStatus.OK, ImageStatus.INVALID, ImageStatus.NEW_URL]
                    .includes(imageObject.status)) {
                let siteImage = this.convertToSiteImage(imageObject);
                this.siteLogModel.siteInformation.siteImages.push(siteImage);
            } else if (imageObject.status === ImageStatus.NEW_IMAGE) {
                pendingImageObjects.push(imageObject);
            } else if (imageObject.status === ImageStatus.DELETING) {
                pendingImageObjects.push(imageObject);
            }
        });

        this.isCurrentImgPanelEditable = false;
        this.isPreviousImgPanelEditable = false;
        return (pendingImageObjects.length === 0) ? Observable.of(false) :
                this.processOutputSiteImages(pendingImageObjects);
    }

    /**
     * Recursively upload or delete site images from the pending list
     */
    private processOutputSiteImages(pendingImageObjects: ImageObject[]): Observable<boolean> {
        let imageObject: ImageObject = pendingImageObjects.pop();
        if (imageObject.status === ImageStatus.DELETING) {
            return this.associatedDocumentService.deleteDocument(imageObject.name).pipe(
                mergeMap((response: Response) => {
                    if (response.status !== 204) {
                        console.error('Error in deleting site image ' + imageObject.name
                                     + ': status code = ' + response.status);
                    } else {
                        console.log(imageObject.name + ' has been deleted');
                    }

                    return (pendingImageObjects.length === 0) ? Observable.of(true)
                            : this.processOutputSiteImages(pendingImageObjects);
                })
            );
        } else {
            return this.associatedDocumentService.uploadDocument(imageObject.name,
                        imageObject.imageFile).pipe(
                mergeMap((response: Response) => {
                    const location = response.headers.get('location');
                    if (!location) {
                        console.error('Failed in uploading site image ' + imageObject.name
                                    + ': returned file reference is empty.');
                    } else {
                        let fileReference = location.replace(/"/g, '').replace('stack', 'host');
                        let siteImage = this.convertToSiteImage(imageObject, fileReference);
                        this.siteLogModel.siteInformation.siteImages.push(siteImage);
                        console.log('Image uploaded successfully: ' + fileReference);
                    }

                    return (pendingImageObjects.length === 0) ? Observable.of(true)
                            : this.processOutputSiteImages(pendingImageObjects);
                })
            );
        }
    }

    private convertToSiteImage(imageObject: ImageObject, fileReference?: string): SiteImageViewModel {
        let siteImage = new SiteImageViewModel();
        siteImage.name = imageObject.name;
        siteImage.description = imageObject.title;
        siteImage.imageType = imageObject.imageType;
        siteImage.formatCreatedDate(imageObject.createdDate);
        siteImage.fileReference = fileReference ? fileReference : imageObject.fullSizeImage;
        return siteImage;
    }

    private initialise(): void {
        this.description = null;
        this.fileReference = null;
        this.imagePreviewError = null;
        this.createdDate = MiscUtils.getUTCDateTime();
        this.allImageObjects = [];
        this.siteLogModel.siteInformation.siteImages.forEach((siteImage: SiteImageViewModel) => {
            let imageObject = new ImageObject();
            imageObject.name = siteImage.name;
            imageObject.title = siteImage.description;
            imageObject.setFileReference(siteImage.fileReference);
            imageObject.createdDate = MiscUtils.formatDateTimeSimple(siteImage.createdDate);
            imageObject.imageType = siteImage.imageType;
            this.allImageObjects.push(imageObject);
        });
    }

    private resetAddImageForm(): void {
        this.description = null;
        this.fileReference = null;
        this.selectedImageFile = null;
        this.selectedImageContent = null;
        this.imagePreviewError = null;
        this.ng2Select.active = [];
        this.addImageForm.controls['imageUrl'].reset();
    }

    private markImageFormsAsDirty(): void {
        this.currentImageForm.markAsDirty();
        this.previousImageForm.markAsDirty();
        this.siteLogService.sendApplicationStateMessage({
            applicationFormModified: true,
            applicationFormInvalid: false,
            applicationSaveState: ApplicationSaveState.idle
        });
    }

    private markFormAsPristine(): void {
        let currentImagePanelDirty = false;
        this.currentImageObjects.forEach((imageObject: ImageObject) => {
            if (imageObject.status !== ImageStatus.OK && imageObject.status !== ImageStatus.INVALID) {
                currentImagePanelDirty = true;
            }
        });
        if (!currentImagePanelDirty) {
            this.currentImageForm.markAsPristine();
        }

        let previousImagePanelDirty = false;
        this.previousImageObjects.forEach((imageObject: ImageObject) => {
            if (imageObject.status !== ImageStatus.OK && imageObject.status !== ImageStatus.INVALID) {
                previousImagePanelDirty = true;
            }
        });
        if (!previousImagePanelDirty) {
            this.previousImageForm.markAsPristine();
        }
    }

    private getNewImageName(url: string): string {
        let originalImageName = this.getOriginalImageName(url);
        this.createdDate = this.addImageForm.controls['createdDate'].value;
        return this.siteId + '_' + this.getMapKey(this.description) + '_'
            + MiscUtils.formatDateTimeString(this.createdDate) + '.'
            + this.getFileExtension(originalImageName);
    }

    private getOriginalImageName(url: string): string {
        return url.split('/').pop().split('\\').pop().split('?').pop().split('=').pop().split('#')[0];
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
        this.allImageObjects.sort((previous: ImageObject, current: ImageObject) => {
            if (previous.title > current.title) {
                return sort1 === 'desc' ? -1 : 1;
            } else if (previous.title < current.title) {
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

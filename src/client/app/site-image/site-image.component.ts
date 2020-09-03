import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { SelectComponent } from 'ng2-select';
import * as _ from 'lodash';

import { MiscUtils } from '../shared/global/misc-utils';
import { DialogService } from '../shared/index';
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

    public currentImageObjects: ImageObject[] = [];
    public previousImageObjects: ImageObject[] = [];

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
    public isUploading: boolean = false;
    public description: string = null;
    public createdDate: string = MiscUtils.getUTCDate();;
    public fileReference: string = null;
    public selectedImageContent: string = null;
    public imagePreviewError: string = null;

    private duplicateMarker: string = 'duplicate_';
    private selectedImageFile: File = null;
    private fileReader: FileReader;
    private subscription: Subscription;

    constructor(protected associatedDocumentService: AssociatedDocumentService,
                protected siteLogService: SiteLogService,
                protected dialogService: DialogService,
                protected formBuilder: FormBuilder) {
        super(siteLogService);
    }

    ngOnInit() {
        if (this.siteLogModel.siteInformation.siteImages === null) {
            this.siteLogModel.siteInformation.siteImages = [];
        }
        this.setupForm();
        this.initialise();

        this.subscription = this.siteLogService.getApplicationState()
                            .subscribe((applicationState: ApplicationState) => {
            if (applicationState.applicationSaveState === ApplicationSaveState.saved) {
                this.initialise();
                this.addImageForm.markAsPristine();
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
            return this.selectedImageContent !== null;
        } else {
            return !!this.fileReference;
        }
    }

    public handleImagePreviewError(): void {
        if (this.fileReference) {
            this.imagePreviewError = 'Invalid image URL or not an image URL.';
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
        if (!this.isCurrentImgPanelEditable) {
            this.currentImageObjects.forEach((imageObject: ImageObject) => {
                if (imageObject.status === ImageStatus.DELETING) {
                    imageObject.status = ImageStatus.OK;
                } else if (imageObject.status === ImageStatus.DELETED) {
                    imageObject.status = ImageStatus.INVALID;
                }
            });
        }
    }

    public togglePreviousImgPanelEditButton(): void {
        this.isPreviousImgPanelOpen = true;
        this.isPreviousImgPanelEditable = !this.isPreviousImgPanelEditable;
        if (!this.isPreviousImgPanelEditable) {
            this.previousImageObjects.forEach((imageObject: ImageObject) => {
                if (imageObject.status === ImageStatus.DELETING) {
                    imageObject.status = ImageStatus.OK;
                } else if (imageObject.status === ImageStatus.DELETED) {
                    imageObject.status = ImageStatus.INVALID;
                }
            });
        }
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
            this.fileReference = null;
            this.selectedImageFile = null;
            this.selectedImageContent = null;
            this.imagePreviewError = null;
            this.addImageForm.controls['imageUrl'].reset();
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

    public onCreatedDateChange(date: Date): void {
        this.createdDate = MiscUtils.formatDateToDateString(date);
    }

    public setImageDescription(value: string): void {
        this.description = value;
    }

    public getSiteImageDefinitionValues(): string[] {
        return Array.from(this.siteImageDefinitions.values());
    }

    public handleImageSelectEvent(imgFile: File): void {
        this.selectedImageContent = null;
        this.selectedImageFile = imgFile;
        if (imgFile && imgFile.type.includes('image/')) {
            this.imagePreviewError = null;
            this.fileReader = new FileReader();
            this.fileReader.readAsDataURL(this.selectedImageFile);
            this.fileReader.onload = (event: any) => {
                this.selectedImageContent = event.target.result;
            };
        } else {
            this.imagePreviewError = 'Invalid image file path or not an image file.';
        }
    }

    public previewImageUrl(event: any): void {
        this.imagePreviewError = null;
        this.fileReference = this.addImageForm.controls['imageUrl'].value;
    }

    public addSiteImageFileOrURL(): void {
        if (this.useImageFileType) {
            this.addSiteImage();
        } else {
            this.addImageUrl();
        }
    }

    public addSiteImage(): void {
        let imageObject = new ImageObject(ImageStatus.NEW_IMAGE);
        imageObject.name = this.getNewImageName(this.selectedImageFile.name);
        imageObject.title = this.description;
        imageObject.createdDate = this.createdDate;
        imageObject.imageType = this.selectedImageFile.type;
        let duplicateImage = this.findDuplicateImage(imageObject.name);
        if (duplicateImage) {
            const msgHtml = '<div><div class="title">Duplicate Image Name</div>'
                    + '<div class="body">The image name "<b>' + imageObject.name
                    + '</b>" has already been added to the sitelog. Click "Yes" '
                    + 'will overwrite the existing image. You may change <b>Image'
                    + ' Description</b> (<i>' + imageObject.title + '</i>)'
                    + ' and/or <b>Date Taken</b> (<i>' + imageObject.createdDate
                    + '</i>) and try again.</div><p class="footer">Do you really want'
                    + ' to overwrite the existing image?</p></div>';
                this.dialogService.showConfirmDialog(
                    msgHtml,
                    () => {
                        this.markDuplicateImage(duplicateImage);
                        this.uploadSiteImage(imageObject, this.selectedImageFile);
                    },
                    () => {}
                );
        } else {
            this.uploadSiteImage(imageObject, this.selectedImageFile);
        }
    }

    public addImageUrl(): void {
        let imageObject = new ImageObject(ImageStatus.NEW_URL);
        imageObject.name = this.getNewImageName(this.fileReference);
        imageObject.title = this.description;
        imageObject.setFileReference(this.fileReference);
        imageObject.createdDate = this.createdDate;
        imageObject.imageType = 'image/' + this.getFileExtension(this.fileReference);
        let duplicateImage = this.findDuplicateImage(imageObject.name, imageObject.fullSizeImage);
        if (duplicateImage) {
            const msgHtml = '<div><div class="title">Duplicate Image Name/URL</div>'
                    + '<div class="body">The image name "<b>' + imageObject.name
                    + '</b>" or URL "<b>' + imageObject.fullSizeImage + '</b>" '
                    + 'has already been added to the sitelog. Click "Yes" will '
                    + 'overwrite the existing data.</div><p class="footer">Do '
                    + 'you really want to overwrite the existing data?</p></div>';
                this.dialogService.showConfirmDialog(
                    msgHtml,
                    () => {
                        this.markDuplicateImage(duplicateImage);
                        this.addNewImage(imageObject);
                    },
                    () => {}
                );
        } else {
            this.addNewImage(imageObject);
        }
    }

    public handleImageDeletionEvent(isCurrentImage: boolean, imageDeleted: ImageObject): void {
        const imageObjects = isCurrentImage ? this.currentImageObjects : this.previousImageObjects;
        for (let i in imageObjects) {
            const index = Number(i);
            let imageObject = imageObjects[index];
            if (imageObject.name === imageDeleted.name) {
                if (imageDeleted.status === ImageStatus.CANCEL) {
                    this.unmarkDuplicateImage(imageDeleted);
                    imageObjects.splice(index, 1);
                    this.processInputImages(this.getAllImageObjects());
                    this.markFormAsPristine();
                } else if (imageDeleted.status === ImageStatus.OK
                        || imageDeleted.status === ImageStatus.INVALID) {
                    this.markFormAsPristine();
                } else {
                    imageObject.status = imageDeleted.status;
                    if (isCurrentImage) {
                        this.currentImageForm.markAsDirty();
                    } else {
                        this.previousImageForm.markAsDirty();
                    }

                    this.siteLogService.sendApplicationStateMessage({
                        applicationFormModified: true,
                        applicationFormInvalid: false,
                        applicationSaveState: ApplicationSaveState.idle
                    });
                }
                break;
            }
        };
    }

    public prepareForSave(): void {
        this.siteLogModel.siteInformation.siteImages = [];
        this.getAllImageObjects().forEach((imageObject: ImageObject) => {
            if (!this.isDuplicateImage(imageObject) && [ImageStatus.OK, ImageStatus.INVALID,
                ImageStatus.NEW_IMAGE, ImageStatus.NEW_URL].includes(imageObject.status)) {
                let siteImage = this.convertToSiteImage(imageObject);
                this.siteLogModel.siteInformation.siteImages.push(siteImage);
            }
        });

        this.isCurrentImgPanelEditable = false;
        this.isPreviousImgPanelEditable = false;
    }

    private getAllImageObjects(): ImageObject[] {
        return this.currentImageObjects.concat(this.previousImageObjects);
    }

    private findDuplicateImage(imageName: string, fileReference: string = null): ImageObject {
        let allImageObjects = this.getAllImageObjects();
        for (let imageObject of allImageObjects) {
            if (this.isDuplicateImage(imageObject)) {
                continue;
            } else if (imageObject.name === imageName) {
                return imageObject;
            } else if (fileReference && imageObject.fullSizeImage === fileReference) {
                return imageObject;
            }
        }
        return null;
    }

    private isDuplicateImage(imageObject: ImageObject): boolean {
        return imageObject && imageObject.name.startsWith(this.duplicateMarker);
    }

    private markDuplicateImage(imageObject: ImageObject): void {
        if (imageObject && !this.isDuplicateImage(imageObject)) {
            imageObject.name = this.duplicateMarker + imageObject.name;
        }
    }

    private unmarkDuplicateImage(imageObject: ImageObject): void {
        for (let image of this.getAllImageObjects()) {
            if (!this.isDuplicateImage(image)) {
                continue;
            } else if (imageObject.name === image.name
                    || imageObject.fullSizeImage === image.fullSizeImage) {
                image.name = image.name.replace(this.duplicateMarker, '');
                break;
            }
        }
    }

    private uploadSiteImage(imageObject: ImageObject, imageFile: File): void {
        this.isUploading = true;
        this.associatedDocumentService.uploadDocument(imageObject.name, imageFile).subscribe(
            (response: Response) => {
                const location = response.headers.get('location');
                    if (!location) {
                        console.error('Failed in uploading site image ' + imageObject.name
                                    + ': returned file reference is empty.');
                    } else {
                        let fileReference = this.associatedDocumentService.getWebServiceURL() + location;
                        imageObject.setFileReference(fileReference);
                        this.addNewImage(imageObject);
                        console.log('Image uploaded successfully: ' + fileReference);
                    }
            },
            (error: Error) => {
                this.isUploading = false;
                console.error('Failed in uploading site image ' + imageObject.name
                            + ': ' + error.message);
            },
            () => {
                this.isUploading = false;
            }
        );
    }

    private convertToSiteImage(imageObject: ImageObject): SiteImageViewModel {
        let siteImage = new SiteImageViewModel();
        siteImage.name = imageObject.name;
        siteImage.description = imageObject.title;
        siteImage.imageType = imageObject.imageType;
        siteImage.createdDate = MiscUtils.formatUTCDate(imageObject.createdDate);
        siteImage.fileReference = imageObject.fullSizeImage;
        return siteImage;
    }

    private initialise(): void {
        this.description = null;
        this.fileReference = null;
        this.imagePreviewError = null;
        this.createdDate = MiscUtils.getUTCDate();

        let allImageObjects: ImageObject[] = [];
        this.siteLogModel.siteInformation.siteImages.forEach((siteImage: SiteImageViewModel) => {
            let imageObject = new ImageObject();
            imageObject.name = siteImage.name;
            imageObject.title = siteImage.description;
            imageObject.setFileReference(siteImage.fileReference);
            imageObject.createdDate = MiscUtils.formatUTCDate(siteImage.createdDate);
            imageObject.imageType = siteImage.imageType;
            allImageObjects.push(imageObject);
        });

        this.processInputImages(allImageObjects);
    }

    private processInputImages(allImageObjects: ImageObject[]): void {
        this.currentImageObjects = [];
        this.previousImageObjects = [];
        let descriptionTypes = this.getSiteImageDefinitionValues();
        this.sortImagesByDescriptionAndCreatedDate(allImageObjects, 'asc', 'desc');
        allImageObjects.forEach((imageObject: ImageObject) => {
            const index = descriptionTypes.indexOf(imageObject.title);
            if (index > -1) {
                this.currentImageObjects.push(imageObject);
                descriptionTypes.splice(index, 1);
            } else {
                this.previousImageObjects.push(imageObject);
            }
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

    private addNewImage(newImage: ImageObject): void {
        let isInCurrentImages: boolean = false;
        for (let i in this.currentImageObjects) {
            const index = Number(i);
            let currentImage = this.currentImageObjects[index];
            if (currentImage.title === newImage.title) {
                isInCurrentImages = true;
                if (newImage.createdDate >= currentImage.createdDate) {
                    this.currentImageObjects.splice(index, 1, newImage);
                    this.currentImageForm.markAsDirty();
                    this.isCurrentImgPanelOpen = true;
                    this.previousImageObjects.unshift(currentImage);
                    this.previousImageForm.markAsDirty();
                    this.isPreviousImgPanelOpen = true;
                } else {
                    this.previousImageObjects.unshift(newImage);
                    this.previousImageForm.markAsDirty();
                    this.isPreviousImgPanelOpen = true;
                }
            }
        }

        if (!isInCurrentImages) {
            this.currentImageObjects.push(newImage);
            this.currentImageForm.markAsDirty();
            this.isCurrentImgPanelOpen = true;
        }

        this.siteLogService.sendApplicationStateMessage({
            applicationFormModified: true,
            applicationFormInvalid: false,
            applicationSaveState: ApplicationSaveState.idle
        });
        this.resetAddImageForm();
    }

    private markFormAsPristine(): void {
        let isCurrentImagePanelPristine = true;
        for (let imageObject of this.currentImageObjects) {
            if (imageObject.status !== ImageStatus.OK && imageObject.status !== ImageStatus.INVALID) {
                isCurrentImagePanelPristine = false;
                break;
            }
        }

        if (isCurrentImagePanelPristine) {
            this.currentImageForm.markAsPristine();
            this.previousImageForm.markAsPristine();
        }

        let isPreviousImagePanelPristine = true;
        for (let imageObject of this.previousImageObjects) {
            if (imageObject.status !== ImageStatus.OK && imageObject.status !== ImageStatus.INVALID) {
                isPreviousImagePanelPristine = false;
                break;
            }
        }

        if (isPreviousImagePanelPristine) {
            this.previousImageForm.markAsPristine();
        }
    }

    private getNewImageName(url: string): string {
        let originalImageName = this.getOriginalImageName(url);
        return this.siteId + '_' + this.getMapKey(this.description) + '_'
            + MiscUtils.formatDateSimple(this.createdDate) + '.'
            + this.getFileExtension(originalImageName);
    }

    private getOriginalImageName(url: string): string {
        return url.split('/').pop().split('\\').pop().split('?').shift().split('#').shift();
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
        if (!imagePath || imagePath.length < 4) {
            return null;
        }
        let index1 = imagePath.indexOf('?');
        if (index1 !== -1) {
            imagePath = imagePath.substring(0, index1);
        }
        let index2 = imagePath.lastIndexOf('.');
        if (index2 === -1) {
            return null;
        }
        return imagePath.substring(index2 + 1).toLowerCase();
    }

    private sortImagesByDescriptionAndCreatedDate(imageObjects: ImageObject[], sort1: string, sort2: string): void {
        imageObjects.sort((previous: ImageObject, current: ImageObject) => {
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

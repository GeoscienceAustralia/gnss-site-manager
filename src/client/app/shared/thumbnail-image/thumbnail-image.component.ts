import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChange,
    SimpleChanges,
} from '@angular/core';
import { DialogService } from '../index';
import { ImageObject, ImageStatus } from './image-object';

@Component({
    moduleId: module.id,
    selector: 'thumbnail-image',
    templateUrl: 'thumbnail-image.component.html',
    styleUrls: ['thumbnail-image.component.css'],
})
export class ThumbnailImageComponent implements OnChanges, OnInit, OnDestroy {

    public thumbImageWidth: number = 200;
    public thumbImageHeight: number = 150;
    public imagePanelHeight: number = 320;

    @Input() set imageSize(data: any) {
        if (data && typeof data === 'object') {
            if (data.hasOwnProperty('width') && typeof data['width'] === 'number') {
                this.thumbImageWidth = data['width'];
            }
            if (data.hasOwnProperty('height') && typeof data['height'] === 'number') {
                this.thumbImageHeight = data['height'];
            }
        }
    }
    @Input() images: Array<ImageObject> = [];
    @Input() isAuthorised: boolean = false;
    @Input() allowViewFullSizeImage: boolean = true;
    @Output() imageDeletionEvent: EventEmitter<ImageObject> = new EventEmitter<ImageObject>();

    public showFullSizeImage: boolean = false;
    public fullSizeImageIndex: number = 0;

    get imageStatus() {
        return ImageStatus;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.setImagePanelHeight();
    }

    /**
     * Pressing "Esc" key can close full-size image viewing window
     */
    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event && event.key && this.showFullSizeImage) {
            if (event.key.toLowerCase() === 'escape') {
                this.closeFullSizeImage();
            }
        }
    }

    constructor(
        private cdRef: ChangeDetectorRef,
        private elRef: ElementRef,
        private dialogService: DialogService,
    ) { }

    ngOnInit() {
        this.setImagePanelHeight();
        this.cdRef.detectChanges();
    }

    ngOnDestroy() {
        this.images = [];
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes.imageSize) {
            const size: SimpleChange = changes.imageSize;
            if (size.previousValue && size.currentValue
                && size.previousValue.width && size.previousValue.height
                && size.currentValue.width && size.currentValue.height
                && (size.previousValue.width !== size.currentValue.width
                    || size.previousValue.height !== size.currentValue.height)) {
                this.setImagePanelHeight();
            }
        }
    }

    setImagePanelHeight() {
        this.imagePanelHeight = 2 * this.thumbImageHeight + 20;
    }

    /**
     * Delete or undelete an image
     */
    deleteImage(imageIndex: number) {
        let image: ImageObject = this.images[imageIndex];
        if (this.isDuplicateImage(image)) {
            ;  // Do nothing for duplicate images
        } else if (image.status === ImageStatus.NEW_IMAGE || image.status === ImageStatus.NEW_URL) {
            image.status = ImageStatus.CANCEL;
            this.imageDeletionEvent.emit(image);
        } else if (image.status === ImageStatus.DELETING) {
            image.status = ImageStatus.OK;
            this.imageDeletionEvent.emit(image);
        } else if (image.status === ImageStatus.DELETED) {
            image.status = ImageStatus.INVALID;
            this.imageDeletionEvent.emit(image);
        } else if (image.status === ImageStatus.INVALID) {
            image.status = ImageStatus.DELETED;
            this.imageDeletionEvent.emit(image);
        } else if (image.status === ImageStatus.OK) {
            const confirmInfo = '<div>'
                + '<div class="title">Site Image Deletion</div><p/>'
                + '<div class="body">"' + image.title + ' ' + image.createdDate
                +     '" will be marked for deletion.</div><p/>'
                + '<div class="note">NOTE: images will not be deleted until the '
                +     '"Save" button on the top header is clicked.</div><p/>'
                + '<div class="footer">Do you really want to delete "' + image.title
                +     ' ' + image.createdDate + '"?</div>'
                + '</div>';
            this.dialogService.showConfirmDialog(
                confirmInfo,
                () => {
                    image.status = ImageStatus.DELETING;
                    this.imageDeletionEvent.emit(image);
                },
                () => {}
            );
        }
    }

    getDeleteButtonName(image: ImageObject): string {
        if (this.isDuplicateImage(image)) {
            return 'Duplicate';
        } else if (image.status === ImageStatus.NEW_IMAGE || image.status === ImageStatus.NEW_URL) {
            return 'Cancel';
        } else if (image.status === ImageStatus.DELETING || image.status === ImageStatus.DELETED) {
            return 'Undelete';
        } else {
            return 'Delete';
        }
    }

    getDeleteButtonCss(image: ImageObject): string {
        if (this.isDuplicateImage(image)) {
            return 'btn-primary';
        } else if (image.status === ImageStatus.OK || image.status === ImageStatus.INVALID) {
            return 'btn-danger';
        } else {
            return 'btn-primary';
        }
    }

    getGlyphiconRemoveCss(image: ImageObject): string {
        if (this.isDuplicateImage(image)) {
            return '';
        } else if (image.status === ImageStatus.NEW_IMAGE
         || image.status === ImageStatus.NEW_URL
         || image.status === ImageStatus.DELETING) {
            return 'glyphicon-share-alt';
        } else {
            return 'glyphicon-remove';
        }
    }

    getDeleteButtonTooltip(image: ImageObject): string {
        if (this.isDuplicateImage(image)) {
            return '';
        } else if (image.status === ImageStatus.NEW_IMAGE || image.status === ImageStatus.NEW_URL) {
            return 'Cancel the image';
        } else if (image.status === ImageStatus.DELETING) {
            return 'Undelete the image';
        } else {
            return 'Delete the image';
        }
    }

    isDuplicateImage(image: ImageObject): boolean {
        return image.name.indexOf('duplicate_') !== -1;
    }

    viewFullSizeImage(index: number) {
        if (this.allowViewFullSizeImage) {
            this.fullSizeImageIndex = index;
            this.openFullSizeImage();
        }
    }

    openFullSizeImage() {
        if (this.images && this.images[this.fullSizeImageIndex]) {
            this.showFullSizeImage = true;
            this.elRef.nativeElement.ownerDocument.body.style.overflow = 'hidden';
        }
    }

    closeFullSizeImage() {
        this.showFullSizeImage = false;
        this.elRef.nativeElement.ownerDocument.body.style.overflow = '';
    }

    onErrorImgSrc(imgElem: HTMLElement, image: ImageObject) {
        imgElem.style.display = 'none';
        image.status = ImageStatus.INVALID;
    }
}

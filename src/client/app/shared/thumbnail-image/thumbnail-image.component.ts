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
import { ImageObject } from './image-object';

@Component({
    moduleId: module.id,
    selector: 'thumbnail-image',
    templateUrl: 'thumbnail-image.component.html',
    styleUrls: ['thumbnail-image.component.css'],
})
export class ThumbnailImageComponent implements OnChanges, OnInit, OnDestroy {

    thumbImageWidth: number = 200;
    thumbImageHeight: number = 150;
    imagePanelHeight: number = 320;

    @Input() set imageSize(data: any) {
        if (data && typeof (data) === 'object') {
            if (data.hasOwnProperty('width') && typeof (data['width']) === 'number') {
                this.thumbImageWidth = data['width'];
            }
            if (data.hasOwnProperty('height') && typeof (data['height']) === 'number') {
                this.thumbImageHeight = data['height'];
            }
        }
    }
    @Input() images: Array<ImageObject> = [];
    @Input() itemsPerSlider: number = 6;
    @Input() allowPopupFullSizeImage: boolean = true;
    @Input() canDeleteImages: boolean = false;
    @Output() imageRemoveEvent: EventEmitter<string> = new EventEmitter<string>();

    public showFullSizeImage: boolean = false;
    public fullSizeImageIndex: number = 0;

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.setSliderWidth();
    }

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
        this.setSliderWidth();
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
                this.setSliderWidth();
            }
        }
    }

    setSliderWidth() {
        this.imagePanelHeight = 2 * this.thumbImageHeight + 20;
    }

    deleteImage(imageIndex: number) {
        let image: ImageObject = this.images[imageIndex];
        let msgHtml: string = '<div><div class="title">Confirm Site Image Deletion</div>'
            + '<div class="body"><p/><p>"' + image.title + ' ' + image.createdDate
            + '" will be permanently deleted from system storage and database.'
            + '<span class="text-danger">This operation can not be undone.</span></p><p/></div>'
            + '<p class="footer">Do you really want to delete "' + image.title + ' ' + image.createdDate + '"?</p></div>';
        this.dialogService.showConfirmDialog(
            msgHtml,
            () => {
                this.images.splice(imageIndex, 1);
                this.imageRemoveEvent.emit(image.name);
            },
            () => {}
        );
    }

    viewFullSizeImage(index: number) {
        if (this.allowPopupFullSizeImage) {
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
}

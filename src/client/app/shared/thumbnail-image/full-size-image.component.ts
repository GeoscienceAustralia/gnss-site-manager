import { Component, EventEmitter, HostListener, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ImageObject } from './image-object';

@Component({
    moduleId: module.id,
    selector: 'full-size-image',
    templateUrl: 'full-size-image.component.html',
    styleUrls: ['full-size-image.component.css'],
})
export class FullSizeImageComponent implements OnInit, OnDestroy {

    @Input() images: Array<ImageObject> = [];
    @Input() currentImageIndex: number = 0;
    @Output() closeEvent = new EventEmitter<any>();

    public currentImage: ImageObject;

    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event && event.key) {
            if (event.key.toLowerCase() === 'arrowright') {
                this.showNextImage();
            }

            if (event.key.toLowerCase() === 'arrowleft') {
                this.showPrevImage();
            }

            if (event.key.toLowerCase() === 'escape') {
                this.close();
            }
        }
    }

    constructor() { }

    ngOnInit() {
        if (this.currentImageIndex >= 0 && this.currentImageIndex < this.images.length) {
            this.currentImage = this.images[this.currentImageIndex];
        }
    }

    ngOnDestroy() {
        this.images = [];
        this.currentImage = null;
    }

    close() {
        this.closeEvent.emit();
    }

    showPrevImage() {
        this.currentImageIndex --;
        if (this.currentImageIndex < 0) {
            this.currentImageIndex = this.images.length - 1;
        }
        this.currentImage = this.images[this.currentImageIndex];
    }

    showNextImage() {
        this.currentImageIndex ++;
        if (this.currentImageIndex >= this.images.length) {
            this.currentImageIndex = 0;
        }
        this.currentImage = this.images[this.currentImageIndex];
    }
}

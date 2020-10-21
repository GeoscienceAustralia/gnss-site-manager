import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractInput } from './abstract-input.component';

@Component({
    moduleId: module.id,
    selector: 'file-input',
    templateUrl: 'file-input.component.html',
    styleUrls: ['file-input.component.css']
})
export class FileInputComponent extends AbstractInput implements OnInit {

    @Output()
    fileSelectEvent: EventEmitter<File> = new EventEmitter<File>();

    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }

    public openFileBrowser(event: Event) {
        event.preventDefault();
        let fileInputElem: HTMLElement = document.getElementById('dummy-file-input') as HTMLElement;
        fileInputElem.click();
    }

    public chooseFile(imageInput: HTMLInputElement): void {
        if (imageInput.files && imageInput.files[0]) {
            let fileSelected: File = imageInput.files[0];
            this.form.controls[this.controlName].setValue(fileSelected.name);
            this.fileSelectEvent.emit(fileSelected);
            imageInput.value = '';
        }
    }
}

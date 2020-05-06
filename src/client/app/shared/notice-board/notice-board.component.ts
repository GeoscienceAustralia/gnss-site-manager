import { Component } from '@angular/core';

/**
 * This class represents the notice board component.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-notice-board',
    templateUrl: 'notice-board.component.html'
})
export class NoticeBoardComponent {

    public noticeTitle: string;
    public noticeText: string;

    constructor() {
        // To publish a notice/message, add the title and text below
        this.noticeTitle = '';
        this.noticeText = '';
    }
}

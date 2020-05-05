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
        this.noticeTitle = 'System Outage Notice';
        this.noticeText = 'GNSS Site Manager application may be down for scheduled maintenance on 6 May 2020, between 9 am and 12 pm AEST.';
    }
}

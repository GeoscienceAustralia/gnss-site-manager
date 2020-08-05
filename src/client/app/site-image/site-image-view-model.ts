export class SiteImageViewModel {
    public name: string;
    public description: string;
    public fileReference: string;
    public imageType: string;
    public createdDate: string;

    /*
     * Format "YYYY-MM-DD HH:mm:ss" obtained from datetime picker to "YYYY-MM-DDTHH:mm:ss.SSSZ"
     */
    public formatCreatedDate(date: string): void {
        this.createdDate = date.trim().replace(' ', 'T');
        if (this.createdDate.length <= 19) {
            this.createdDate += '.000Z';
        }
    }
}

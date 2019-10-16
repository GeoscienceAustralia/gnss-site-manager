export class SiteImageViewModel {
    public name: string;
    public description: string;
    public fileReference: string;
    public imageType: string;
    public createdDate: string;
    public originalName: string;

    /*
     * Format "YYYY-MM-DD HH:mm:ss" obtained from datetime picker to "YYYY-MM-DDTHH:mm:ss.SSSZ"
     */
    public setCreatedDate(date: string): void {
        this.createdDate = date.trim().replace(' ', 'T');
        this.createdDate += '.000Z';
    }
}

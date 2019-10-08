export class ImageObject {

    public name: string;
    public title: string;
    public fullSizeImage: string;
    public thumbnailImage: string;
    public createdDate: string;

    constructor(imageName: string, imageTitle: string, imagePath: string, date: string) {
        this.name = imageName;
        this.title = imageTitle;
        this.fullSizeImage = imagePath;
        this.thumbnailImage = imagePath;
        this.createdDate = date;
    }
}


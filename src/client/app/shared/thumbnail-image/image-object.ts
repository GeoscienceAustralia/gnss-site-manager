/**
 * Image status lifecycle:
 *     OK ---------> DELETING ----> OK
 *     INVALID ----> DELETED -----> INVALID
 *     NEW_IMAGE --> CANCEL ------> (New image removed)
 *     NEW_URL ----> CANCEL ------> (New URL removed)
 */
export enum ImageStatus {
    OK,
    INVALID,
    NEW_IMAGE,
    NEW_URL,
    CANCEL,
    DELETING,
    DELETED,
}

export class ImageObject {

    public name: string;
    public title: string;
    public fullSizeImage: string;
    public thumbnailImage: string;
    public createdDate: string;
    public imageType: string;
    public imageFile: File;
    public status: ImageStatus;

    constructor(status: ImageStatus = ImageStatus.OK) {
        this.status = status;
    }

    public setFileReference(fileReference: string): void {
        this.fullSizeImage = fileReference;
        this.thumbnailImage = fileReference;
    }
}

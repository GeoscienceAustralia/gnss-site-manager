import { by, element, ElementFinder, ElementArrayFinder, browser } from 'protractor';

export class SiteImagePage {
    readonly siteImageGroup: ElementFinder = element(by.id('site-image-panel'));
    readonly siteImageHeader: ElementFinder = this.siteImageGroup.element(by.css('span.panel-title'));
    readonly newImageButton: ElementFinder = this.siteImageGroup.element(by.id('new-site-images'));

    readonly addImagePanel: ElementFinder = element(by.id('add-image-panel'));
    readonly addImageHeader: ElementFinder = this.addImagePanel.element(by.css('div span.panel-title'));
    readonly descriptionInput: ElementFinder = element(by.css('div.ui-select-container'));
    readonly createdDateInput: ElementFinder = this.addImagePanel.element(by.css('div datetime-input[controlName="createdDate"]'));
    readonly imageFileInput: ElementFinder = element(by.id('site-image-input'));
    readonly imageUrlInput: ElementFinder = element(by.css('input[formControlName="imageUrl"]'));
    readonly imageFileRadioButton: ElementFinder = element(by.id('addImageFile'));
    readonly imageUrlRadioButton: ElementFinder = element(by.id('addImageURL'));
    readonly addNewImageButton: ElementFinder = element(by.cssContainingText('button', 'Add'));

    readonly currentImagePanel: ElementFinder = element(by.id('current-image-panel'));
    readonly currentImageHeader: ElementFinder = this.currentImagePanel.element(by.css('div span.panel-title'));
    readonly currentImageEditButton: ElementFinder = this.currentImagePanel.element(by.css('div span button'));

    readonly allSiteImages: ElementArrayFinder = element.all(by.css('div.img-frame'));
    readonly deleteConfirmButton: ElementFinder = element(by.buttonText('Yes'));

    public imageCount: number = 0;

    public checkExistingImages() {
        this.allSiteImages.count().then((count: number) => {
            this.imageCount = count;
            console.log('\tNumber of images before testing: ' + count);
        });
        browser.waitForAngular();
    }

    public selectImageDescription(descriptionValue: string) {
        this.descriptionInput.click().then(() => {
            element(by.cssContainingText('a.dropdown-item div', descriptionValue))
            .click().then(() => {
                console.log('\tImage Description: ' + descriptionValue);
            });
        });
        browser.waitForAngular();
    }

    public setImageCreatedDate(date: string) {
        this.createdDateInput.clear().then(() => {
            this.createdDateInput.sendKeys(date).then(() => {
                console.log('\tCreated Date: ' + date);
            });
        });
        browser.waitForAngular();
    }

    public enterExternalImageUrl(imageURL: string) {
        this.imageUrlRadioButton.click().then(() => {
            this.imageUrlInput.sendKeys(imageURL).then(() => {
                console.log('\tImage URL: ' + imageURL);
            });
        });
        browser.waitForAngular();
    }

    public addNewImage() {
        this.addNewImageButton.isEnabled().then((isEnabled: boolean) => {
            if (isEnabled) {
                this.addNewImageButton.click().then(() => {
                    console.log('\tNew image URL has been successfully added.');
                });
            } else {
                console.log('\tNot a valid image URL. Skip adding new image.');
            }
        });
        browser.waitForAngular();
    }

    public deleteFirstSiteImage() {
        this.allSiteImages.first().element(
            by.cssContainingText('button.btn-delete', 'Delete')
        ).click().then(() => {
            this.deleteConfirmButton.click().then(() => {
                console.log('\tDeleted an image.');
            });
        });
    }
}

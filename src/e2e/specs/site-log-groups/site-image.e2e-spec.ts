import { browser } from 'protractor';
import { LoginActions } from '../utils/login.actions';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { SiteImagePage } from '../page-objects/site-image.pageobject';


describe('Site Image Component', () => {
    let siteId: string = 'ADE1';
    let description: string = 'Antenna North Facing';
    let imageURL: string = 'https://dev.gnss-site-manager.geodesy.ga.gov.au/assets/img/ga-logo-inline.svg';

    let originalTimeout: number;
    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);
    let siteLogPage: SiteLogPage;
    let siteImagePage: SiteImagePage;

    beforeAll(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;

        browser.get(selectSitePage.url);
        browser.waitForAngular();
        loginActions.login('user.a', 'gumby123A');
        browser.waitForAngular();
        siteLogPage = selectSitePage.openSiteLogPage(siteId);
        siteImagePage = new SiteImagePage();
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        loginActions.logout();
    });

    it('expect should be able to add an external image URL', () => {
        console.log('a) Add an external image URL');
        siteLogPage.siteInformationHeader.click().then(() => {
            siteImagePage.checkExistingImages();
            siteImagePage.siteImageHeader.click().then(() => {
                siteImagePage.newImageButton.click().then(() => {
                    siteImagePage.selectImageDescription(description);
                    siteImagePage.enterExternalImageUrl(imageURL);
                    browser.wait(() => {
                        return siteLogPage.siteIdMenu.click()
                               && siteLogPage.saveSiteLink.isEnabled();
                    }, 15000);
                    siteImagePage.addNewImage();
                });
            });
        });
    });

    it('expect should be able to verify new images saved to sitelog', () => {
        console.log('b) Verify new images saved to sitelog');
        siteLogPage.save();
        siteLogPage.reload(siteId);
        siteLogPage.siteInformationHeader.click().then(() => {
            siteImagePage.siteImageHeader.click().then(() => {
                siteImagePage.currentImageHeader.click().then(() => {
                    siteImagePage.allSiteImages.count().then((count: number) => {
                        console.log('\tNumber of images after saving: ' + count);
                        expect(count).toBe(siteImagePage.imageCount + 1);
                    });
                });
            });
        });
    });

    it('expect should be able to delete images', () => {
        console.log('c) Delete an image');
        siteImagePage.currentImageEditButton.click().then(() => {
            siteImagePage.deleteFirstSiteImage();
        });

        siteLogPage.save();
        siteLogPage.reload(siteId);
        siteLogPage.siteInformationHeader.click().then(() => {
            siteImagePage.siteImageHeader.click().then(() => {
                siteImagePage.currentImageHeader.click().then(() => {
                    siteImagePage.allSiteImages.count().then((count: number) => {
                        console.log('\tNumber of images after deletion: ' + count);
                        expect(count).toBe(siteImagePage.imageCount);
                    });
                });
            });
        });
    });
});

/**
 * This is the 'View Model' for Site Identification.
 *
 */
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class SiteIdentificationViewModel extends AbstractViewModel {
    public siteName: string = null;
    public fourCharacterID: string = null;
    public monumentInscription: string = null;
    public iersDOMESNumber: string = null;
    public cdpNumber: string = null;
    public monumentDescription: string = null;
    public heightOfTheMonument: number = null;
    public monumentFoundation: string = null;
    public foundationDepth: number = null;
    public markerDescription: string = null;
    public dateInstalled: string = null;
    public geologicCharacteristic: string = null;
    public bedrockType: string = null;
    public bedrockCondition: string = null;
    public fractureSpacing: string = null;
    public faultZonesNearby: string = null;
    public distanceActivity: string = null;
    public notes: string = null;
}

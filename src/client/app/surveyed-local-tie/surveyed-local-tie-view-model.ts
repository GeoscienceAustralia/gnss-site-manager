import {AbstractViewModel} from '../shared/json-data-view-model/view-model/abstract-view-model';
import {MiscUtils} from '../shared/global/misc-utils';

export class SurveyedLocalTieViewModel extends AbstractViewModel {

    /**
     * Not the best form making private fields public, however saves clutter of creating accessors / getters for all
     */
    public tiedMarkerName: string;
    public tiedMarkerUsage: string;
    public tiedMarkerCDPNumber: string;
    public tiedMarkerDOMESNumber: string;
    public dx: number;
    public dy: number;
    public dz: number;

    public localSiteTiesAccuracy: string;
    public tiedMarkerSurveyMethod: string;
    public dateMeasured: string;

    public notes: string;

    constructor() {
        super();
        let presentDT: string = MiscUtils.getPresentDateTime();
        this.dateMeasured = presentDT;

        this.tiedMarkerName = '';
        this.tiedMarkerUsage = '';
        this.tiedMarkerCDPNumber = '';
        this.tiedMarkerDOMESNumber = '';
        this.localSiteTiesAccuracy = '';
        this.notes = '';
        this.dx = 0;
        this.dy = 0;
        this.dz = 0;
    }

    createFieldMappings(): void {

        this.addFieldMapping('/surveyedLocalTies/tiedMarkerName', 'string',
            '/tiedMarkerName', 'string');
        this.addFieldMapping('/surveyedLocalTies/tiedMarkerUsage', 'string',
            '/tiedMarkerUsage', 'string');
        this.addFieldMapping('/surveyedLocalTies/tiedMarkerCDPNumber', 'string',
            '/tiedMarkerCDPNumber', 'string');
        this.addFieldMapping('/surveyedLocalTies/tiedMarkerDOMESNumber', 'string',
            '/tiedMarkerDOMESNumber', 'string');
        this.addFieldMapping('/surveyedLocalTies/localSiteTiesAccuracy', 'string',
            '/localSiteTiesAccuracy', 'string');
        this.addFieldMapping('/surveyedLocalTies/surveyMethod', 'string',
            '/surveyMethod', 'string');

        this.addFieldMapping('/surveyedLocalTies/differentialComponentsGNSSMarkerToTiedMonumentITRS/dx', 'string',
            '/dx', 'number');
        this.addFieldMapping('/surveyedLocalTies/differentialComponentsGNSSMarkerToTiedMonumentITRS/dy', 'string',
            '/dy', 'number');
        this.addFieldMapping('/surveyedLocalTies/differentialComponentsGNSSMarkerToTiedMonumentITRS/dz', 'string',
            '/dz', 'number');

        this.addFieldMapping('/surveyedLocalTies/dateMeasured/value/0', 'string',
            '/dateMeasured', 'string');

        this.addFieldMapping('/surveyedLocalTies/notes', 'string',
            '/notes', 'string');
    };

    /**
     * Called on the 'last' object before creating a new one to populate it with some values such as endDate.
     */
    setFinalValuesBeforeCreatingNewItem(): void {
        // nothing to do for now
    }
}

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

        this.addFieldMapping('/surveyedLocalTie/tiedMarkerName', 'string',
            '/tiedMarkerName', 'string');
        this.addFieldMapping('/surveyedLocalTie/tiedMarkerUsage', 'string',
            '/tiedMarkerUsage', 'string');
        this.addFieldMapping('/surveyedLocalTie/tiedMarkerCDPNumber', 'string',
            '/tiedMarkerCDPNumber', 'string');
        this.addFieldMapping('/surveyedLocalTie/tiedMarkerDOMESNumber', 'string',
            '/tiedMarkerDOMESNumber', 'string');
        this.addFieldMapping('/surveyedLocalTie/localSiteTiesAccuracy', 'string',
            '/localSiteTiesAccuracy', 'string');
        this.addFieldMapping('/surveyedLocalTie/surveyMethod', 'string',
            '/surveyMethod', 'string');

        this.addFieldMapping('/surveyedLocalTie/differentialComponentsGNSSMarkerToTiedMonumentITRS/dx', 'string',
            '/dx', 'number');
        this.addFieldMapping('/surveyedLocalTie/differentialComponentsGNSSMarkerToTiedMonumentITRS/dy', 'string',
            '/dy', 'number');
        this.addFieldMapping('/surveyedLocalTie/differentialComponentsGNSSMarkerToTiedMonumentITRS/dz', 'string',
            '/dz', 'number');

        this.addFieldMapping('/surveyedLocalTie/dateMeasured/value/0', 'string',
            '/dateMeasured', 'string');

        this.addFieldMapping('/surveyedLocalTie/notes', 'string',
            '/notes', 'string');
    };

    /**
     * Called on the 'last' object before creating a new one to populate it with some values such as endDate.
     */
    setFinalValuesBeforeCreatingNewItem(): void {
        // nothing to do for now
    }
}

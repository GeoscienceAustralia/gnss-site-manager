import {Injectable} from '@angular/core';
import {SiteLogDataModel, DataSiteLog} from './data-model/site-log-data-model';
import {GnssAntennaViewModel} from '../../gnss-antenna/gnss-antenna-view-model';
import {FrequencyStandardViewModel} from '../../frequency-standard/frequency-standard-view-model';
import {HumiditySensorViewModel} from '../../humidity-sensor/humidity-sensor-view-model';
import {PressureSensorViewModel} from '../../pressure-sensor/pressure-sensor-view-model';
import {TemperatureSensorViewModel} from '../../temperature-sensor/temperature-sensor-view-model';
import {WaterVaporSensorViewModel} from '../../water-vapor-sensor/water-vapor-sensor-view-model';
import {SiteLogViewModel, ViewSiteLog} from './view-model/site-log-view-model';
import {AbstractViewModel} from './view-model/abstract-view-model';
import {DataViewTranslatorService} from './data-view-translator';
import {FieldMaps} from './field-maps';

/**
 * This class provides the service to convert from 'Geodesy data model JSON' (from the XML via Jsonix) to
 * 'Geodesy view model JSON' as consumed by the UI component classes.
 */
@Injectable()
export class JsonViewModelService {

    /**
     * Given Geodesy data model JSON, translate to view model json.
     * @param dataModelJson from the GeodesyML - complete ViewSiteLog instance.
     * @return  translated ViewModelJson
     */
    public dataModelToViewModelJson(dataModelJson: any): SiteLogViewModel {
        let siteLogDataModel: SiteLogDataModel = <SiteLogDataModel> dataModelJson;
        console.debug('dataModelToViewModelJson - siteLogDataModel: ', siteLogDataModel);
        let siteLogViewModel: SiteLogViewModel = <SiteLogViewModel>{};
        siteLogViewModel.siteLog = new ViewSiteLog();

        siteLogViewModel.siteLog.gnssAntennas = this.dataToViewModel(siteLogDataModel['geo:siteLog'].gnssAntennas, GnssAntennaViewModel);
        siteLogViewModel.siteLog.frequencyStandards = this.dataToViewModel(siteLogDataModel['geo:siteLog'].frequencyStandards,
            FrequencyStandardViewModel);
        siteLogViewModel.siteLog.humiditySensors = this.dataToViewModel(siteLogDataModel['geo:siteLog'].humiditySensors,
            HumiditySensorViewModel);
        siteLogViewModel.siteLog.pressureSensors = this.dataToViewModel(siteLogDataModel['geo:siteLog'].pressureSensors,
            PressureSensorViewModel);
        siteLogViewModel.siteLog.temperatureSensors = this.dataToViewModel(siteLogDataModel['geo:siteLog'].temperatureSensors,
            TemperatureSensorViewModel);
        siteLogViewModel.siteLog.waterVaporSensors = this.dataToViewModel(siteLogDataModel['geo:siteLog'].waterVaporSensors,
            WaterVaporSensorViewModel);

        // For now just copy the DataModel parts over that haven't had translate to view written yet
        siteLogViewModel.siteLog.siteIdentification = siteLogDataModel['geo:siteLog'].siteIdentification;
        siteLogViewModel.siteLog.siteLocation = siteLogDataModel['geo:siteLog'].siteLocation;
        siteLogViewModel.siteLog.gnssReceivers = siteLogDataModel['geo:siteLog'].gnssReceivers;

        siteLogViewModel.siteLog.surveyedLocalTies = siteLogDataModel['geo:siteLog'].surveyedLocalTies;
        siteLogViewModel.siteLog.siteOwner = siteLogDataModel['geo:siteLog'].siteOwner;
        siteLogViewModel.siteLog.siteContact = siteLogDataModel['geo:siteLog'].siteContact;
        siteLogViewModel.siteLog.siteMetadataCustodian = siteLogDataModel['geo:siteLog'].siteMetadataCustodian;
        siteLogViewModel.siteLog.siteDataSource = siteLogDataModel['geo:siteLog'].siteDataSource;
        siteLogViewModel.siteLog.moreInformation = siteLogDataModel['geo:siteLog'].moreInformation;
        siteLogViewModel.siteLog.dataStreamsSet = siteLogDataModel['geo:siteLog'].dataStreamsSet;

        console.debug('dataModelToViewModelJson - siteLogViewModel: ', siteLogViewModel);

        return siteLogViewModel;
    }

    public viewModelToDataModelJson(viewModelJson: SiteLogViewModel): SiteLogDataModel {
        console.debug('viewModelToDataModelJson - viewModelJson: ', viewModelJson);

        let siteLogDataModel: SiteLogDataModel = <SiteLogDataModel>{};
        siteLogDataModel['geo:siteLog'] = <DataSiteLog>{};
        siteLogDataModel['geo:siteLog'].gnssAntennas = this.viewToDataModel(viewModelJson.siteLog.gnssAntennas);
        siteLogDataModel['geo:siteLog'].frequencyStandards = this.viewToDataModel(viewModelJson.siteLog.frequencyStandards);
        siteLogDataModel['geo:siteLog'].humiditySensors = this.viewToDataModel(viewModelJson.siteLog.humiditySensors);
        siteLogDataModel['geo:siteLog'].pressureSensors = this.viewToDataModel(viewModelJson.siteLog.pressureSensors);
        siteLogDataModel['geo:siteLog'].temperatureSensors = this.viewToDataModel(viewModelJson.siteLog.temperatureSensors);
        siteLogDataModel['geo:siteLog'].waterVaporSensors = this.viewToDataModel(viewModelJson.siteLog.waterVaporSensors);
        siteLogDataModel['geo:siteLog'].siteIdentification = viewModelJson.siteLog.siteIdentification;
        siteLogDataModel['geo:siteLog'].siteLocation = viewModelJson.siteLog.siteLocation;
        siteLogDataModel['geo:siteLog'].gnssReceivers = viewModelJson.siteLog.gnssReceivers;
        siteLogDataModel['geo:siteLog'].surveyedLocalTies = viewModelJson.siteLog.surveyedLocalTies;
        siteLogDataModel['geo:siteLog'].siteOwner = viewModelJson.siteLog.siteOwner;
        siteLogDataModel['geo:siteLog'].siteContact = viewModelJson.siteLog.siteContact;
        siteLogDataModel['geo:siteLog'].siteMetadataCustodian = viewModelJson.siteLog.siteMetadataCustodian;
        siteLogDataModel['geo:siteLog'].siteDataSource = viewModelJson.siteLog.siteDataSource;
        siteLogDataModel['geo:siteLog'].moreInformation = viewModelJson.siteLog.moreInformation;
        siteLogDataModel['geo:siteLog'].dataStreamsSet = viewModelJson.siteLog.dataStreamsSet;

        return siteLogDataModel;
    }

    /* ***************************** Helper functions ***************************** */

    /**
    * Translate data model to view model
    * @param dataModels - array of data model items to convert
    * @param viewModelInstance - used as a template to copy and populate.  And has methods used.
    * @returns {AbstractViewModel[]} that is the super type of all view model types
    */
    private dataToViewModel<T extends AbstractViewModel>(dataModels: any[], type: {new(): T ;}): T[] {
        let viewModels: T[] = [];
        if (dataModels) {
            for (let dataModel of dataModels) {
                let newViewModel: T = new type();
                let fieldMappings: FieldMaps = newViewModel.getFieldMaps();
                DataViewTranslatorService.translateD2V(dataModel, newViewModel, fieldMappings);  // humiditySensor
                viewModels.push(newViewModel);
            }
        }
        return viewModels;
    }

    /**
    * Translate view model to data model
    * @param viewModels - array of view model items to convert
    * @param viewModelInstance - used as a template to copy and populate.  And has methods used.
    * @returns {any[]} - translated data model
    */
    private viewToDataModel<T extends AbstractViewModel>(viewModels: T[]): any[] {
        let dataModels: any[] = [];
        if (viewModels) {
            for (let viewModel of viewModels) {
                let fieldMappings: FieldMaps = viewModel.getFieldMaps();
                let dataModel: any = {};
                DataViewTranslatorService.translateV2D(viewModel, dataModel, fieldMappings);
                dataModels.push(dataModel);
            }
        }
        return dataModels;
    }

}

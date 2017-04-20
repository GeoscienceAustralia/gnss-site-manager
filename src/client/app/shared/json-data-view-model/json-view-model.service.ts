import { Injectable } from '@angular/core';
import { SiteLogDataModel } from './data-model/site-log-data-model';
import { GnssAntennaViewModel } from '../../gnss-antenna/gnss-antenna-view-model';
import { GnssReceiverViewModel } from '../../gnss-receiver/gnss-receiver-view-model';
import { SurveyedLocalTieViewModel } from '../../surveyed-local-tie/surveyed-local-tie-view-model';
import { FrequencyStandardViewModel } from '../../frequency-standard/frequency-standard-view-model';
import { LocalEpisodicEffectViewModel } from '../../local-episodic-effect/local-episodic-effect-view-model';
import { HumiditySensorViewModel } from '../../humidity-sensor/humidity-sensor-view-model';
import { PressureSensorViewModel } from '../../pressure-sensor/pressure-sensor-view-model';
import { TemperatureSensorViewModel } from '../../temperature-sensor/temperature-sensor-view-model';
import { WaterVaporSensorViewModel } from '../../water-vapor-sensor/water-vapor-sensor-view-model';
import { ResponsiblePartyViewModel } from '../../responsible-party/responsible-party-view-model';
import { SiteLogViewModel } from './view-model/site-log-view-model';
import { AbstractViewModel } from './view-model/abstract-view-model';
import { DataViewTranslatorService, doWriteViewToData } from './data-view-translator';
import { FieldMaps } from './field-maps';
import { SiteIdentificationMappings } from '../../site-info/site-identification.mapping';
import { SiteLocationMappings } from '../../site-info/site-location.mapping';

/**
 * This class provides the service to convert from 'Geodesy data model JSON' (from the XML via Jsonix) to
 * 'Geodesy view model JSON' as consumed by the UI component classes.
 */
@Injectable()
export class JsonViewModelService {
    private _siteLogDataModel: SiteLogDataModel;
    /**
     * Given Geodesy data model JSON, translate to view model json.
     * @param dataModelJson from the GeodesyML - complete ViewSiteLog instance.
     * @return  translated ViewModelJson
     */
    public dataModelToViewModelJson(dataModelJson: any): SiteLogViewModel {
        let siteLogDataModel: SiteLogDataModel = new SiteLogDataModel(dataModelJson);
        console.debug('dataModelToViewModelJson - siteLogDataModel: ', siteLogDataModel);

        let siteLogViewModel: SiteLogViewModel = new SiteLogViewModel();

        siteLogViewModel.siteLog.gnssAntennas = this.dataToViewModel(siteLogDataModel.gnssAntennas,
            GnssAntennaViewModel);
        siteLogViewModel.siteLog.gnssReceivers = this.dataToViewModel(siteLogDataModel.gnssReceivers,
            GnssReceiverViewModel);
        siteLogViewModel.siteLog.surveyedLocalTies = this.dataToViewModel(siteLogDataModel.surveyedLocalTies,
            SurveyedLocalTieViewModel);
        siteLogViewModel.siteLog.frequencyStandards = this.dataToViewModel(siteLogDataModel.frequencyStandards,
            FrequencyStandardViewModel);
        siteLogViewModel.siteLog.localEpisodicEffects = this.dataToViewModel(siteLogDataModel.localEpisodicEffects,
            LocalEpisodicEffectViewModel);
        siteLogViewModel.siteLog.humiditySensors = this.dataToViewModel(siteLogDataModel.humiditySensors,
            HumiditySensorViewModel);
        siteLogViewModel.siteLog.pressureSensors = this.dataToViewModel(siteLogDataModel.pressureSensors,
            PressureSensorViewModel);
        siteLogViewModel.siteLog.temperatureSensors = this.dataToViewModel(siteLogDataModel.temperatureSensors,
            TemperatureSensorViewModel);
        siteLogViewModel.siteLog.waterVaporSensors = this.dataToViewModel(siteLogDataModel.waterVaporSensors,
            WaterVaporSensorViewModel);

        // Form (View) Model approach
        DataViewTranslatorService.translate(siteLogDataModel.siteIdentification, siteLogViewModel.siteLog.siteIdentification,
            new SiteIdentificationMappings().getFieldMaps());
        DataViewTranslatorService.translate(siteLogDataModel.siteLocation, siteLogViewModel.siteLog.siteLocation,
            new SiteLocationMappings().getFieldMaps());

        siteLogViewModel.siteLog.siteOwner = [this.dataToViewModelItem(siteLogDataModel.siteOwner, ResponsiblePartyViewModel)];
        siteLogViewModel.siteLog.siteContact = this.dataToViewModel(siteLogDataModel.siteContact, ResponsiblePartyViewModel);
        siteLogViewModel.siteLog.siteMetadataCustodian = [this.dataToViewModelItem(siteLogDataModel.siteMetadataCustodian,
            ResponsiblePartyViewModel)];
        siteLogViewModel.siteLog.siteDataSource = this.dataToViewModel(siteLogDataModel.siteDataSource, ResponsiblePartyViewModel);
        // siteLogViewModel.siteLog.siteDataCenter = this.dataToViewModel(siteLogDataModel.siteDataCentre, ResponsiblePartyViewModel);

        // For now just copy the DataModel parts over that haven't had translate to view written yet
        siteLogViewModel.siteLog.moreInformation = siteLogDataModel.moreInformation;
        siteLogViewModel.siteLog.dataStreams = siteLogDataModel.dataStreams;

        console.debug('dataModelToViewModelJson - siteLogViewModel: ', siteLogViewModel);

        return siteLogViewModel;
    }

    public viewModelToDataModelJson(viewModelJson: SiteLogViewModel): SiteLogDataModel {
        console.debug('viewModelToDataModelJson - viewModelJson: ', viewModelJson);

        let siteLogDataModel: SiteLogDataModel = new SiteLogDataModel({'geo:siteLog':{}});

        siteLogDataModel.gnssAntennas = this.viewToDataModel(viewModelJson.siteLog.gnssAntennas);
        siteLogDataModel.gnssReceivers = this.viewToDataModel(viewModelJson.siteLog.gnssReceivers);
        siteLogDataModel.surveyedLocalTies = this.viewToDataModel(viewModelJson.siteLog.surveyedLocalTies);
        siteLogDataModel.frequencyStandards = this.viewToDataModel(viewModelJson.siteLog.frequencyStandards);
        siteLogDataModel.localEpisodicEffects = this.viewToDataModel(viewModelJson.siteLog.localEpisodicEffects);
        siteLogDataModel.humiditySensors = this.viewToDataModel(viewModelJson.siteLog.humiditySensors);
        siteLogDataModel.pressureSensors = this.viewToDataModel(viewModelJson.siteLog.pressureSensors);
        siteLogDataModel.temperatureSensors = this.viewToDataModel(viewModelJson.siteLog.temperatureSensors);
        siteLogDataModel.waterVaporSensors = this.viewToDataModel(viewModelJson.siteLog.waterVaporSensors);

        DataViewTranslatorService.translate(viewModelJson.siteLog.siteIdentification, siteLogDataModel.siteIdentification,
            new SiteIdentificationMappings().getFieldMaps(), doWriteViewToData);
        DataViewTranslatorService.translate(viewModelJson.siteLog.siteLocation, siteLogDataModel.siteLocation,
            new SiteLocationMappings().getFieldMaps(), doWriteViewToData);

        DataViewTranslatorService.translate(viewModelJson.siteLog.siteContact, siteLogDataModel.siteContact,
            new ResponsiblePartyViewModel().getFieldMaps(), doWriteViewToData);
        DataViewTranslatorService.translate(viewModelJson.siteLog.siteDataSource, siteLogDataModel.siteDataSource,
            new ResponsiblePartyViewModel().getFieldMaps(), doWriteViewToData);
        // Only one siteOwner, siteMetadataCustodian (at most) in an array
        DataViewTranslatorService.translate(viewModelJson.siteLog.siteOwner[0], siteLogDataModel.siteOwner,
            new ResponsiblePartyViewModel().getFieldMaps(), doWriteViewToData);
        DataViewTranslatorService.translate(viewModelJson.siteLog.siteMetadataCustodian[0], siteLogDataModel.siteMetadataCustodian,
            new ResponsiblePartyViewModel().getFieldMaps(), doWriteViewToData);

        siteLogDataModel.moreInformation = viewModelJson.siteLog.moreInformation;
        siteLogDataModel.dataStreams = viewModelJson.siteLog.dataStreams;

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
        for (let dataModel of dataModels) {
            let newViewModel: T = this.dataToViewModelItem(dataModel, type);
            viewModels.push(newViewModel);
        }
        return viewModels;
    }

    /**
     * Translate a single data model Item to view model.
     * @param dataModel
     * @param type of the ViewModel
     * @return {T} translated view model
     */
    private dataToViewModelItem<T extends AbstractViewModel>(dataModel: any, type: {new(): T ;}): T {
        let newViewModel: T = new type();
        let fieldMappings: FieldMaps = newViewModel.getFieldMaps();
        DataViewTranslatorService.translateD2V(dataModel, newViewModel, fieldMappings);

        return newViewModel;
    }

    /**
     * Translate view model to data model
     * @param viewModels - array of view model items to convert
     * @param viewModelInstance - used as a template to copy and populate.  And has methods used.
     * @returns {any[]} - translated data model
     */
    private viewToDataModel<T extends AbstractViewModel>(viewModels: T[]): any[] {
        let dataModels: any[] = [];
        for (let viewModel of viewModels) {
            let fieldMappings: FieldMaps = (<T> viewModel).getFieldMaps();
            let dataModel: any = {};
            DataViewTranslatorService.translateV2D(viewModel, dataModel, fieldMappings);
            dataModels.push(dataModel);
        }
        return dataModels;
    }
}

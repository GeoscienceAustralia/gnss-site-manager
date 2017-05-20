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
import { DataViewTranslatorService, doWriteViewToData, FieldMap } from './data-view-translator';
import { SiteIdentificationMappings } from '../../site-log/site-identification.mapping';
import { SiteLocationMappings } from '../../site-log/site-location.mapping';

/**
 * This class provides the service to convert from 'Geodesy data model JSON' (from the XML via Jsonix) to
 * 'Geodesy view model JSON' as consumed by the UI component classes.
 */
@Injectable()
export class JsonViewModelService {
    /**
     * Given Geodesy data model JSON, translate to view model json.
     * @param dataModel from the GeodesyML - complete ViewSiteLog instance.
     * @return  translated ViewModel
     */
    public dataModelToViewModel(dataModel: any): SiteLogViewModel {
        let siteLogDataModel: SiteLogDataModel = new SiteLogDataModel(dataModel);
        console.debug('dataModelToViewModel - siteLogDataModel: ', siteLogDataModel);

        let siteLogViewModel: SiteLogViewModel = new SiteLogViewModel();

        siteLogViewModel.gnssAntennas = this.dataToViewModel(siteLogDataModel.gnssAntennas, GnssAntennaViewModel);
        siteLogViewModel.gnssReceivers = this.dataToViewModel(siteLogDataModel.gnssReceivers, GnssReceiverViewModel);
        siteLogViewModel.surveyedLocalTies = this.dataToViewModel(siteLogDataModel.surveyedLocalTies, SurveyedLocalTieViewModel);
        siteLogViewModel.frequencyStandards = this.dataToViewModel(siteLogDataModel.frequencyStandards, FrequencyStandardViewModel);
        siteLogViewModel.localEpisodicEffects = this.dataToViewModel(siteLogDataModel.localEpisodicEffects, LocalEpisodicEffectViewModel);
        siteLogViewModel.humiditySensors = this.dataToViewModel(siteLogDataModel.humiditySensors, HumiditySensorViewModel);
        siteLogViewModel.pressureSensors = this.dataToViewModel(siteLogDataModel.pressureSensors, PressureSensorViewModel);
        siteLogViewModel.temperatureSensors = this.dataToViewModel(siteLogDataModel.temperatureSensors, TemperatureSensorViewModel);
        siteLogViewModel.waterVaporSensors = this.dataToViewModel(siteLogDataModel.waterVaporSensors, WaterVaporSensorViewModel);

        // Form (View) Model approach
        DataViewTranslatorService.translate(siteLogDataModel.siteIdentification, siteLogViewModel.siteIdentification,
            new SiteIdentificationMappings().getObjectMap());

        DataViewTranslatorService.translate(siteLogDataModel.siteLocation, siteLogViewModel.siteLocation,
            new SiteLocationMappings().getObjectMap());

        siteLogViewModel.siteOwner = this.dataToViewModel([siteLogDataModel.siteOwner], ResponsiblePartyViewModel);
        siteLogViewModel.siteContacts = this.dataToViewModel(siteLogDataModel.siteContacts, ResponsiblePartyViewModel);
        siteLogViewModel.siteMetadataCustodian = this.dataToViewModel([siteLogDataModel.siteMetadataCustodian], ResponsiblePartyViewModel);
        siteLogViewModel.siteDataSource = this.dataToViewModel([siteLogDataModel.siteDataSource], ResponsiblePartyViewModel);
        siteLogViewModel.siteDataCenters = this.dataToViewModel(siteLogDataModel.siteDataCenters, ResponsiblePartyViewModel);

        // For now just copy the DataModel parts over that haven't had translate to view written yet
        siteLogViewModel.moreInformation = siteLogDataModel.moreInformation;
        siteLogViewModel.dataStreams = siteLogDataModel.dataStreams;

        console.debug('dataModelToViewModel - siteLogViewModel: ', siteLogViewModel);
        return siteLogViewModel;
    }

    public viewModelToDataModel(viewModel: SiteLogViewModel): SiteLogDataModel {
        console.debug('viewModelToDataModel - viewModel: ', viewModel);

        let siteLogDataModel: SiteLogDataModel = new SiteLogDataModel({'geo:siteLog':{}});

        siteLogDataModel.gnssAntennas = this.viewToDataModel(viewModel.gnssAntennas);
        siteLogDataModel.gnssReceivers = this.viewToDataModel(viewModel.gnssReceivers);
        siteLogDataModel.surveyedLocalTies = this.viewToDataModel(viewModel.surveyedLocalTies);
        siteLogDataModel.frequencyStandards = this.viewToDataModel(viewModel.frequencyStandards);
        siteLogDataModel.localEpisodicEffects = this.viewToDataModel(viewModel.localEpisodicEffects);
        siteLogDataModel.humiditySensors = this.viewToDataModel(viewModel.humiditySensors);
        siteLogDataModel.pressureSensors = this.viewToDataModel(viewModel.pressureSensors);
        siteLogDataModel.temperatureSensors = this.viewToDataModel(viewModel.temperatureSensors);
        siteLogDataModel.waterVaporSensors = this.viewToDataModel(viewModel.waterVaporSensors);

        DataViewTranslatorService.translate(viewModel.siteIdentification, siteLogDataModel.siteIdentification,
            new SiteIdentificationMappings().getObjectMap(), doWriteViewToData);

        DataViewTranslatorService.translate(viewModel.siteLocation, siteLogDataModel.siteLocation,
            new SiteLocationMappings().getObjectMap(), doWriteViewToData);

        siteLogDataModel.siteContacts = this.viewToDataModel(viewModel.siteContacts);

        DataViewTranslatorService.translate(viewModel.siteDataSource[0], siteLogDataModel.siteDataSource,
            new ResponsiblePartyViewModel().getObjectMap(), doWriteViewToData);

        siteLogDataModel.siteDataCenters = this.viewToDataModel(viewModel.siteDataCenters);

        // Only one siteOwner, siteMetadataCustodian (at most) in an array
        DataViewTranslatorService.translate(viewModel.siteOwner[0], siteLogDataModel.siteOwner,
            new ResponsiblePartyViewModel().getObjectMap(), doWriteViewToData);

        DataViewTranslatorService.translate(viewModel.siteMetadataCustodian[0], siteLogDataModel.siteMetadataCustodian,
            new ResponsiblePartyViewModel().getObjectMap(), doWriteViewToData);

        siteLogDataModel.moreInformation = viewModel.moreInformation;
        siteLogDataModel.dataStreams = viewModel.dataStreams;

        console.debug('viewModelToDataModel - siteLogDataModel: ', siteLogDataModel);
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
            let newViewModel: T = new type();
            DataViewTranslatorService.translateD2V(dataModel, newViewModel, newViewModel.getObjectMap());
            viewModels.push(newViewModel);
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
        for (let viewModel of viewModels) {
            let objectMap = (<T> viewModel).getObjectMap();
            let dataModel: any = {};
            DataViewTranslatorService.translateV2D(viewModel, dataModel, objectMap);
            dataModels.push(dataModel);
        }
        return dataModels;
    }
}

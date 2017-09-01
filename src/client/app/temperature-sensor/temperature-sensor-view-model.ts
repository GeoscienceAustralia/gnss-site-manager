import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class TemperatureSensorViewModel extends AbstractViewModel {
    public type: string = null;
    public calibrationDate: string = null;
    public dataSamplingInterval: number = null;
    public accuracy: number = null;
    public notes: string = null;
    public manufacturer: string = null;
    public serialNumber: string = null;
    public heightDiffToAntenna: number = null;
    public aspiration: string = null;
}

export enum EventNames {
    none,
    newItem,
    removeItem,
    cancelNew,
}
export class GeodesyEvent {
    name: EventNames;
    // Pass the data that is relevant for the event
    valueNumber?: number;
    valueString?: string;
    valueObject?: any;

    constructor(name: EventNames) {
        this.name = name;
    }
}

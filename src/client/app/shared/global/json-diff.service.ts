import { Injectable } from '@angular/core';
import { HttpUtilsService } from './http-utils.service';
import { MiscUtils } from './misc-utils';
import * as diff from 'deep-diff';
import IDiff = deepDiff.IDiff;
import { JsonPointerService } from '../json-pointer/json-pointer.service';

/**
 * JSON Differencing service using https://github.com/flitbit/diff.
 */
export enum DiffType {Edited, New, Deleted, NewArrayItem, DeletedArrayItem};

export class DiffItem {
    diffType: DiffType;
    container: string;  // eg. gnssReceiver
    identifier: string; // eg. "2008-01-01 to 2014-10-11"
    item: any;       // eg. Manufacturer
    oldValue: any;   // eg. Leica
    newValue: any;   // eg. Leica Inc OR a new HumiditySensor

    constructor(diffType: DiffType, container: string, item: string, oldValue: string, newValue: string, identifier: string) {
        this.diffType = diffType;
        this.container = container;
        this.item = item;
        this.oldValue = oldValue;
        this.newValue = newValue;
        this.identifier = identifier;
    }
}

export class NormalisedDiffs {
    values: Map<string, DiffItem[]> = new Map<string, DiffItem[]>();
}

@Injectable()
export class JsonDiffService {
    static mapKeySeparator = '=>';
    private xmlAttrMappingFile: string = '/assets/xml-attr-mapping.json';
    private attrMappingJson: any = {};

    /**
     * Return the actual object from this.  It will always be the first item in the object map.
     * @param rawObject
     *
     * private
     */
    static getTheObject(rawObject: any): any {
        let keys: string[] = Object.keys(rawObject);
        let object: any = rawObject[keys[0]];
        return object;
    }

    constructor(private httpService: HttpUtilsService) {
        // Load the XML attribute name mapping JSON object from assets
        this.httpService.loadJsonObject(this.xmlAttrMappingFile).subscribe(
            json => this.attrMappingJson = json,
            error => console.log('Error in loading Json file: ' + error)
        );
    }

    public isDiff(oldJson: any, newJson: any): boolean {
        let jsonDiffs: IDiff[] = this.getJsonDiff(oldJson, newJson);
        return (!jsonDiffs) ? false: true;
    }

    public getJsonDiffHtml(oldJson: any, newJson: any): string {
        let jsonDiffs: IDiff[] = this.getJsonDiff(oldJson, newJson);
        if (!jsonDiffs) {
            return '';
        }
        console.log('deep-diff: ', jsonDiffs);
        let siteManagerDiffs: DiffItem[] = this.getJsonDiffsList(jsonDiffs, oldJson, newJson);
        let normalisedDiffsList: NormalisedDiffs = this.getNormalisedDiffsList(siteManagerDiffs);//, oldJson, newJson);
        let jsonDiffsTable: string = this.getJsonDiffsTable(normalisedDiffsList);
        console.log('jsonDiffsTable: ', jsonDiffsTable);

        return jsonDiffsTable;
    }

    getJsonDiff(oldJson: any, newJson: any): IDiff[] {
        let jsonDiff2: any = diff.diff(oldJson, newJson);
        console.log('deep-diff: ', jsonDiff2);
        return jsonDiff2;
    }

    /**
     *
     * @param jsonDiffs - from deep-diff.diff(lhs, rhs)
     * @returns {string} -
     */
    getJsonDiffsList(jsonDiffs: IDiff[], oldJson: any, newJson: any): DiffItem[] {
        let diffStruct: DiffItem[] = [];

        for (let diff of jsonDiffs) {
            let diffItems: DiffItem[] = this.parseDiffs(diff, newJson);
            Array.prototype.push.apply(diffStruct, diffItems);
        }
        console.log('getJsonDiffsList: ', diffStruct);
        return diffStruct;
    }

    isDeleted(item: any) {
        if ('dateDeleted' in item && item.dateDeleted && item.dateDeleted.length > 0) {
            return true;
        }
        return false;
    }

    /**
     *
     * @param diff - one of the diffs from deep-diff
     * @returns {string} - the path with '/' separating components so acts as a JSONPath and can be used with our
     * JsonPointerService
     */
    getPath(diff: IDiff): string {
        return '/' + diff.path.join('/');
    }

    /**
     *
     * @param diff
     * @returns {string} - the path prior to the item (see getItem()) with '/' separating components so acts as a
     * JSONPath and can be used with our JsonPointerService.  Or '' if none, which
     * is the case with Array diffs.
     */
    getPathToItem(diff: IDiff): string {
        let extract: string = '';
        // Array diffs don't have a path
        if (!diff.path) {
            return '';
        }
        if (diff.path.length <= 1) {
            extract = diff.path[0];
        } else {
            extract = diff.path.slice(0, diff.path.length - 1).join('/');
        }

        return '/' + extract;
    }

    /**
     *
     * @param diff - one of the diffs from deep-diff
     * @returns {string} - the path up to the item that is a difference such as Manufacturer.  Or '' if none, which
     * is the case with Array diffs.
     **/
    getItem(diff: IDiff): string {
        let thePath: string[] = diff.path;
        // Array diffs don't have a path
        if (!thePath) {
            return '';
        }
        return thePath[thePath.length - 1];  // maybe use that mapping
    }


    /**
     * Return the object pointed to by the pathToItem in the jsonNew
     * @param jsonNew - viewModel JSON for the new object being displayed.  Belon
     * @param pathToItem - JSON Path in jsonNew to the item that has the identifier information
     * @returns {any} - the object
     */
    getObject(jsonNew: any, pathToItem: string): any {
        let object: any = JsonPointerService.get(jsonNew, pathToItem);
        if (!object) {
            throw new Error('Unexpected error - path not in object - path: ' + pathToItem + ', object: ' + JSON.stringify(jsonNew));
        }
        return object;
    }

    /**
     * The identifier of an object, such as "beginDate - endData" or just "beginDate" if hasnt ended.
     * @param jsonNew - viewModel JSON for the new object being displayed.  Belon
     * @param pathToItem - JSON Path in jsonNew to the item that has the identifier information
     * @returns {string} such as "beginDate - endData" or just "beginDate" if hasnt ended.
     */
    getIdentifier(object: any): string {
        // The identifiers, if they exist, will be on the object or the first child
        return this.getIdentifierAttempt(object) || this.getIdentifierAttempt(JsonDiffService.getTheObject(object));
    }

    /* ****** Now methods for the normalised data structure (between intermediate and final output) ****** */

    /**
     * The given siteManagerDiffs is a list of each diff, one by one.  This sorts by the container & identifier so it is
     * trivial to create a display form.
     *
     * @param siteManagerDiffs - the diffs, one by one
     * @param oldJson - old ViewModel json
     * @param newJson - new ViewModel json (the diff is how to get from old to new).
     * @return NormalisedDiffs
     */
    getNormalisedDiffsList(siteManagerDiffs: DiffItem[]): NormalisedDiffs { // , oldJson: any, newJson: any
        // The key is 'container:identifier' and the value is [array of each DiffItem]
        let normalised: NormalisedDiffs = new NormalisedDiffs();
        for (let diff of siteManagerDiffs) {
            let key: string = this.getNormalKey(diff);
            if (!normalised.values.has(key)) {
                normalised.values.set(key, new Array<DiffItem>());//new DiffStruct());
            }
            normalised.values.get(key).push(diff);
        }

        return normalised;
    }

    /* ****** Now methods to create the final output - the HTML table showing differences ****** */

    /**
     *
     * @param normalDiffs from getNormalisedDiffsList()
     * @returns {string} HTML Table representation of the diffs
     */
    getJsonDiffsTable(normalDiffs: NormalisedDiffs): string {
        let diffEntries: IterableIterator<[string, Array<DiffItem>]>;
        let nextContainerDiff: IteratorResult<[string, Array<DiffItem>]>;
        let mapKey: string;
        let diffItems: DiffItem[];
        let itemHeader: string;
        let itemsPrinted: number = 0;
        let itemsBeforePrintHeader: number = 10;

        let tableHtml: string = '<table class="table table-striped table-hover">\n';

        diffEntries = normalDiffs.values.entries();

        nextContainerDiff = diffEntries.next();
        while (!nextContainerDiff.done) {
            mapKey = nextContainerDiff.value[0];
            diffItems = nextContainerDiff.value[1];
            itemHeader = this.extractItemHeader(mapKey);

            tableHtml += '<thead><tr><th colspan="3">&nbsp</th></tr>\n';
            tableHtml += '<tr><th colspan="3">' + itemHeader + '</th></tr>\n';
            if (this.isDeletedDiff(diffItems)) {
                tableHtml += '</thead>\n<tbody>\n';
                tableHtml += '<tr><td colspan="3">Deleted</td></tr></tbody>\n';
            } else {
                // If the first item is a DiffType.NewArrayItem then don't want 'OldValue' column
                if (diffItems.length > 0 && diffItems[0].diffType === DiffType.NewArrayItem) {
                    itemsPrinted += itemsBeforePrintHeader;  // to force full header to print next time
                    tableHtml += '<tr><th title="Attribute name">Attribute</th>';
                    tableHtml += '<th colspan="2">Value</th></tr>\n';
                } else {
                    if (itemsPrinted === 0 || (itemsPrinted / itemsBeforePrintHeader >= 1)) {
                        itemsPrinted = 0;
                        tableHtml += '<tr><th title="Attribute name">Attribute</th>';
                        tableHtml += '<th>Old value</th><th>New value</th></tr>\n';
                    }
                }
                tableHtml += '</thead>\n<tbody>\n';
                for (let diffItem of diffItems) {
                    if (diffItem.diffType === DiffType.NewArrayItem) {
                        for (let key of Object.keys(diffItem.newValue).filter(this.onlyWantedFields)) {
                            itemsPrinted++;
                            tableHtml += '<tr><td>' + this.getNameMapping(key) + '</td><td colspan="2">' +
                                this.getNameMapping(diffItem.newValue[key]) + '</td></tr>\n';
                        }
                    } else {
                        itemsPrinted++;
                        tableHtml += '<tr><td>' + this.getNameMapping(diffItem.item) + '</td><td>'
                            + diffItem.oldValue + '</td><td>' + diffItem.newValue + '</td></tr>\n';
                    }
                }
            }
            tableHtml += '</tbody>\n';
            nextContainerDiff = diffEntries.next();
        }
        tableHtml += '</table>\n';
        return tableHtml;
    }

    private getNormalKey(diff: DiffItem) {
        return diff.container + JsonDiffService.mapKeySeparator + diff.identifier;
    }

    /**
     * Parse the data from deep-diff and return a list of diffs.  Can be called recursively (such as for Array diffs).
     *
     * @param diff - the diff to parse
     * @param newJson - the new / rhs JSON that caused the diff
     * @returns {DiffItem[]} - list of diffs
     */
    private parseDiffs(diff: IDiff, newJson: any): DiffItem[] {
        let diffItems: DiffItem[] = [];

        let lhs: string;
        let rhs: string;
        let diffType: DiffType = null;

        let container: string = this.getContainer(diff);                        // eg. HumiditySensors
        let parent: any = this.getObject(newJson, this.getPathToItem(diff)); // eg. HumiditySensors/1 (a HumiditySensor)
        let item: any = this.getItem(diff);                                  // eg. notes (the notes field contains a difference)
        let identifier: string = this.getIdentifier(parent);                    // eg. <startDate> - <endDate>
        switch (diff['kind']) {
            case 'E':
                lhs = diff['lhs'];
                rhs = diff['rhs'];
                if (this.isDeleted(parent)) {
                    identifier = 'Deleted - ' + identifier;
                    diffType = DiffType.DeletedArrayItem;
                } else {
                    diffType = DiffType.Edited;
                }
                break;
            case 'N':
                lhs = '';
                rhs = diff['rhs'];
                diffType = DiffType.New;
                break;
            case 'D':
                lhs = diff['lhs'];
                rhs = '';
                diffType = DiffType.Deleted;
                break;
            case 'A':   // Array
                let arrayDiffItems: DiffItem[] = this.parseDiffs(diff.item, newJson);
                identifier = this.getIdentifier(diff.item.rhs);
                for (let arrayDiffItem of arrayDiffItems) {
                    arrayDiffItem.container = container;
                    arrayDiffItem.item = diff.index;
                    arrayDiffItem.identifier = 'New - ' + identifier;  //'new item ' + (diff.index + 1);
                    if (arrayDiffItem.diffType === DiffType.New) {
                        arrayDiffItem.diffType = DiffType.NewArrayItem;
                    } else if (arrayDiffItem.diffType === DiffType.Deleted) {
                        arrayDiffItem.diffType = DiffType.DeletedArrayItem;
                    }
                    diffItems.push(arrayDiffItem);
                }
                break;
            default:
                console.error('getJsonDiffsList - unhandled kind: ' + diff.kind);
        }
        if (diffType !== null) {
            let diffItem: DiffItem = new DiffItem(diffType, container, item, lhs, rhs, identifier);
            diffItems.push(diffItem);
        }

        return diffItems;
    }

    /**
     *
     * @param diff - one of the diffs from deep-diff
     * @returns {string} - the new top-level item such as HumiditySensor.  Or '' if none, which
     * is the case with Array diffs.
     */
    private getContainer(diff: IDiff): string {
        // Array diffs don't have a path
        if (!diff.path) {
            return '';
        }
        return diff.path[0];  // maybe use that mapping
    }

    private getIdentifierAttempt(object: any): string {
        let ident: string = '';
        if (object.startDate && this.isString(object.startDate)) {
            ident += MiscUtils.prettyFormatDateTime(object.startDate);
        }
        if (object.endDate && this.isString(object.endDate)) {
            ident += ' - ' + MiscUtils.prettyFormatDateTime(object.endDate);
        }
        if (object.dateInstalled && this.isString(object.dateInstalled)) {
            ident += MiscUtils.prettyFormatDateTime(object.dateInstalled);
        }
        if (object.dateRemoved && this.isString(object.dateRemoved)) {
            ident += ' - ' + MiscUtils.prettyFormatDateTime(object.dateRemoved);
        }
        return ident;
    }

    /**
     * Currently not all viewModels have been created and so their dates may be objects instead of a string
     *
     * @param date to check if a string or object
     * @return {boolean} true if given date value is a string
     */
    private isString(date: any): boolean {
        if (date !== date.toString()) {
            console.warn('expecting a string for date - currently an object - probably because from a dataModel instead of a view:', date);
            return false;
        }
        return true;
    }

    /**
     * @param diffs
     * @return boolean - if the diffs have DiffType === DeletedArrayItem
     */
    private isDeletedDiff(diffs: DiffItem[]): boolean {
        // only need to check one
        return (diffs.length > 0 && diffs[0].diffType === DiffType.DeletedArrayItem);
    }

    private onlyWantedFields(field: string) {
        switch (field) {
            case 'fieldMaps':
            case 'dateDeleted':
            case 'dateInserted':
            case 'deletedReason':
                return false;
            default:
                return true;
        }
    }

    private extractItemHeader(key: string): string {
        let regex = new RegExp('(.*?)' + JsonDiffService.mapKeySeparator + '(.*)');
        let groups: RegExpExecArray;
        if ((groups = regex.exec(key)) && groups.length >= 3) {
            let part2: string = groups[2] ? ' (' + groups[2] + ')' : '';
            return this.getNameMapping(groups[1]) + part2;
        } else {
            return 'no table name in key - groups length is: ' + groups.length;
        }
    }

    private getNameMapping(key: string) {
        if (this.attrMappingJson[key] === undefined) {
            return key;
        } else {
            return this.attrMappingJson[key];
        }
    }
}

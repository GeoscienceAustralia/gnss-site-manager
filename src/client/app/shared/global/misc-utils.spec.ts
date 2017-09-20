import { MiscUtils } from './misc-utils';

const dateRegEx = '[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])';
const timeRegEx = '([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]';

export function main() {

    describe('Misc Utils', () => {

        it('should all functions work properly', () => {
            let outputDateTime: string = MiscUtils.getUTCDateTime();
            expect(outputDateTime).toMatch(dateRegEx + ' ' + timeRegEx);

            let inputDateTime: string = '2003-04-25 01:12:23';
            outputDateTime = MiscUtils.formatUTCDateTime(inputDateTime);
            expect(outputDateTime).toEqual('2003-04-25T01:12:23.000Z');

            outputDateTime = MiscUtils.getDateComponent(inputDateTime);
            expect(outputDateTime).toEqual('2003-04-25');
            outputDateTime = MiscUtils.getDateComponent(MiscUtils.formatUTCDateTime(inputDateTime));
            expect(outputDateTime).toEqual('2003-04-25');

            let dateObj: Date = new Date();
            outputDateTime = MiscUtils.formatDateToDateString(dateObj);
            expect(outputDateTime).toMatch(dateRegEx);

            outputDateTime = MiscUtils.formatDateToDatetimeString(dateObj);
            expect(outputDateTime).toMatch(dateRegEx + 'T' + timeRegEx);

            expect(MiscUtils.isNumeric(null)).toBeFalsy();
            expect(MiscUtils.isNumeric(100001)).toBeTruthy();
            expect(MiscUtils.isNumeric('0011x')).toBeFalsy();
            expect(MiscUtils.isNumeric('a123')).toBeFalsy();

            let n = MiscUtils.stringToNumber('123');
            expect(MiscUtils.isNumeric(n)).toBeTruthy();
            let s = MiscUtils.stringToNumber('l123abc');
            expect(MiscUtils.isNumeric(s)).toBeFalsy();
        });
    });
}

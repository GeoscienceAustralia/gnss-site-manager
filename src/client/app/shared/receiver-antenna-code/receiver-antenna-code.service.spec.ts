import { TestBed } from '@angular/core/testing';

import { ReceiverAntennaCodeService } from './receiver-antenna-code.service';

describe('ReceiverAntennaCodeService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ReceiverAntennaCodeService = TestBed.get(ReceiverAntennaCodeService);
        expect(service).toBeTruthy();
    });
});

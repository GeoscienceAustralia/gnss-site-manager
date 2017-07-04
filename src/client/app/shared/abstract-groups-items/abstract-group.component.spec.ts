import { FormGroup, FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from './abstract-group.component';
import { AbstractViewModel } from '../json-data-view-model/view-model/abstract-view-model';
import { MiscUtils } from '../global/misc-utils';
import { SiteLogViewModel } from '../../site-log/site-log-view-model';
import * as _ from 'lodash';

class AbstractViewModelImpl extends AbstractViewModel {
    constructor(public startDate: string) {
        super();
    }
}

class AbstractGroupImpl extends AbstractGroupComponent<AbstractViewModelImpl> {
    constructor() {
        super(null, new FormBuilder());
        this.siteLogModel = new SiteLogViewModel();
        this.parentForm = new FormGroup({});
        super.setupForm();
    }

    getNewItemViewModel(): AbstractViewModelImpl {
        return new AbstractViewModelImpl(null);
    }

    getItemName(): string {
        return 'AbstractGroupImpl';
    }

    getControlName(): string {
        return 'abstractGroupImpl';
    }
}

export function main() {
    let group: AbstractGroupImpl;
    let items: AbstractViewModelImpl[] = null;

    describe('AbstractGroup.setItems', () => {

        beforeEach(() => {
            group = new AbstractGroupImpl();
            items = [
                new AbstractViewModelImpl('2003-01-01T01:02:03.000Z'),
                new AbstractViewModelImpl('2004-01-01T01:02:03.000Z'),
                new AbstractViewModelImpl('2002-01-01T01:02:03.000Z'),
                new AbstractViewModelImpl('2000-01-01T01:02:03.000Z'),
            ];
            items[0].dateDeleted = MiscUtils.getUTCDateTime();
            group.setItems(items);
        });

        it('should remove deleted items', () => {
            expect(group.getItems().length).toEqual(3);
            expect(_(group.getItems()).map(item => item.startDate).includes('2003-01-01T01:02:03.000Z')).toBeFalsy();
        });

        it('should sort items by start date', () => {
            expect(_.isEqual(group.getItems(), _.sortBy(items, item => item.startDate)));
        });
    });
}

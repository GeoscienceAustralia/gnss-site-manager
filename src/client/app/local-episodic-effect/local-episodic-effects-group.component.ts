import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { LocalEpisodicEffectViewModel } from './local-episodic-effect-view-model';
import { SiteLogService } from '../shared/http-request/site-log.service';

/**.
 * This class represents a group of Local Episodic Effects.
 */
@Component({
    moduleId: module.id,
    selector: 'local-episodic-effects-group',
    templateUrl: 'local-episodic-effects-group.component.html',
})
export class LocalEpisodicEffectsGroupComponent extends AbstractGroupComponent<LocalEpisodicEffectViewModel> {

    constructor(protected siteLogService: SiteLogService, formBuilder: FormBuilder) {
        super(siteLogService, formBuilder);
    }

    getItemName(): string {
        return 'Local Episodic Effect';
    }

    getControlName(): string {
        return 'localEpisodicEffects';
    }

    /* **************************************************
     * Other methods
     */
    getNewItemViewModel(): LocalEpisodicEffectViewModel {
        return new LocalEpisodicEffectViewModel();
    }
}

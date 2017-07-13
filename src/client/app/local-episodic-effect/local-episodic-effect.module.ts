import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalEpisodicEffectsGroupComponent } from './local-episodic-effects-group.component';
import { LocalEpisodicEffectItemComponent } from './local-episodic-effect-item.component';
import { FormInputModule } from '../shared/form-input/form-input.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputModule],
    declarations: [LocalEpisodicEffectsGroupComponent, LocalEpisodicEffectItemComponent],
    exports: [LocalEpisodicEffectsGroupComponent, LocalEpisodicEffectItemComponent, FormInputModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LocalEpisodicEffectModule {
}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputModule } from '../shared/form-input/form-input.module';
import { RadioInterferenceItemComponent } from './radio-interference-item.component';
import { RadioInterferenceGroupComponent } from './radio-interference-group.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputModule],
    declarations: [RadioInterferenceGroupComponent, RadioInterferenceItemComponent],
    exports: [RadioInterferenceGroupComponent, RadioInterferenceItemComponent, FormInputModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RadioInterferenceModule {
}

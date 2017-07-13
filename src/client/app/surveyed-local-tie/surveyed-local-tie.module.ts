import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SurveyedLocalTiesGroupComponent } from './surveyed-local-ties-group.component';
import { SurveyedLocalTieItemComponent } from './surveyed-local-tie-item.component';
import { FormInputModule } from '../shared/form-input/form-input.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputModule],
    declarations: [SurveyedLocalTiesGroupComponent, SurveyedLocalTieItemComponent],
    exports: [SurveyedLocalTiesGroupComponent, SurveyedLocalTieItemComponent, FormInputModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SurveyedLocalTieModule {
}

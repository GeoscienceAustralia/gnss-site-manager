import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SurveyedLocalTiesGroupComponent } from './surveyed-local-ties-group.component';
import { SurveyedLocalTieItemComponent } from './surveyed-local-tie-item.component';
import { DynamicFormFieldsModule } from '../shared/dynamic-form-fields/dynamic-form-fields.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DynamicFormFieldsModule],
  declarations: [SurveyedLocalTiesGroupComponent, SurveyedLocalTieItemComponent],
  exports: [ SurveyedLocalTiesGroupComponent, SurveyedLocalTieItemComponent, DynamicFormFieldsModule]
})
export class SurveyedLocalTieModule { }

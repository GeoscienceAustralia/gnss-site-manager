import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponsiblePartyGroupComponent } from './responsible-party-group.component';
import { ResponsiblePartyItemComponent } from './responsible-party-item.component';
import { DynamicFormFieldsModule } from '../shared/dynamic-form-fields/dynamic-form-fields.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DynamicFormFieldsModule],
  declarations: [ ResponsiblePartyGroupComponent, ResponsiblePartyItemComponent ],
  exports: [ ResponsiblePartyGroupComponent, ResponsiblePartyItemComponent ],
})
export class ResponsiblePartyModule { }

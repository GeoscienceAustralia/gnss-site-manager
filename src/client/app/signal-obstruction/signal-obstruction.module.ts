import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputModule } from '../shared/form-input/form-input.module';
import { SignalObstructionItemComponent } from './signal-obstruction-item.component';
import { SignalObstructionGroupComponent } from './signal-obstruction-group.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputModule],
    declarations: [SignalObstructionGroupComponent, SignalObstructionItemComponent],
    exports: [SignalObstructionGroupComponent, SignalObstructionItemComponent, FormInputModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SignalObstructionModule {
}

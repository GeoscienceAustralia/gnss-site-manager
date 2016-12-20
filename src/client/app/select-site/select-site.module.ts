import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectSiteComponent } from './select-site.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [SelectSiteComponent],
  exports: [SelectSiteComponent],
})
export class SelectSiteModule { }

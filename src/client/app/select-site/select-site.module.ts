import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectSiteComponent } from './select-site.component';
import { SelectSiteRoutingModule } from './select-site-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, SelectSiteRoutingModule, SharedModule],
  declarations: [SelectSiteComponent],
  exports: [SelectSiteComponent],
})
export class SelectSiteModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerModule } from './pager/pager.module';
import { DropdownTypeaheadModule } from './dropdown-typeahead/dropdown-typeahead.module';
import { InputRegularModule } from './input-regular/input-regular.module';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    PagerModule,
    DropdownTypeaheadModule,
    InputRegularModule
  ],
})
export class SharedModule { }

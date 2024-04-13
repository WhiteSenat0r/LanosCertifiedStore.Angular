import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerModule } from './components/pager/pager.module';
import { DropdownTypeaheadModule } from './components/dropdown-typeahead/dropdown-typeahead.module';
import { InputRegularModule } from './components/input-regular/input-regular.module';


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

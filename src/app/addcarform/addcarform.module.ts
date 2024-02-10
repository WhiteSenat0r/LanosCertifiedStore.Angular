import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddcarformComponent } from './addcarform.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AddcarformComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddcarformModule { }

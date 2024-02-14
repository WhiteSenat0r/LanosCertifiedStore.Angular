import { Component, OnInit } from '@angular/core';
import { Model } from '../shared/models/model';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { Color } from '../shared/models/color';
import { Displacement } from '../shared/models/displacement';
import { AddcarformService } from './addcarform.service';

@Component({
  selector: 'app-addcarform',
  templateUrl: './addcarform.component.html',
  styleUrls: ['./addcarform.component.css']
})
export class AddcarformComponent implements OnInit {
  models: Model[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  colors: Color[] = [];
  displacements: Displacement[] = [];


  constructor(private addcarformService: AddcarformService) { }

  ngOnInit(): void {
    this.getModel();
    this.getTypes();
    this.getBrands();
    this.getColor();
    this.getDisplacement();
  }
  getModel() {
    this.addcarformService.getModel().subscribe({
      next: response => this.models = response,
      error: error => console.error(error),
      complete: () => console.log("GetData Models"),
    })
  }

  getTypes() {
    this.addcarformService.getTypes().subscribe({
      next: response => this.types = response,
      error: error => console.error(error),
      complete: () => console.log("GetData Types"),
    })
  }

  getBrands() {
    this.addcarformService.getBrands().subscribe({
      next: response => this.brands = response,
      error: error => console.error(error),
      complete: () => console.log("GetData Brands"),
    })
  }

  getColor() {
    this.addcarformService.getColor().subscribe({
      next: response => this.colors = response,
      error: error => console.error(error),
      complete: () => console.log("GetData Color"),
    })
  }

  getDisplacement() {
    this.addcarformService.getDisplacement().subscribe({
      next: response =>  this.displacements = response,
      error: error => console.error(error),
      complete: () => console.log("GetData Displacements"),
    })
  }
}

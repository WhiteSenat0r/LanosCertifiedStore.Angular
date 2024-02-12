import { Component, OnInit } from '@angular/core';
import { Type } from "../shared/models/type";
import { Brand } from "../shared/models/brand";
import { CatalogService } from './catalog.service';
import { Vehicle } from '../shared/models/vehicle';
import { Model } from '../shared/models/model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  types: Type[] = [];
  brands: Brand[] = [];
  models: Model[] = [];

  vehicles: Vehicle[] = [];

  typeNameSelected: string = '';
  modelNameSelected: string = '';
  brandNameSelected: string = '';

  constructor(private catalogService: CatalogService) { };

  ngOnInit(): void {
    this.getTypes();
    this.getVehicles();
    this.getBrands();
  }

  getVehicles() {
    this.catalogService.getVehicles(this.typeNameSelected, this.brandNameSelected, this.modelNameSelected).subscribe({
      next: (response: any) => {
        this.vehicles = response.items;
      },
      error: error => console.error(),
      complete: () => console.log("Vehicles were successfully added"),
    });
  }

  getTypes() {
    this.catalogService.getTypes().subscribe({
      next: response => this.types = [{id: '0', name: 'Types'}, ...response],
      error: error => console.error()
    })
  }

  getBrands() {
    this.catalogService.getBrands().subscribe({
      next: response => this.brands = [{id: '0', name: 'Brands'}, ...response],
      error: error => console.error()
    })
  }

  getModels() {
    this.catalogService.getModels().subscribe({
      next: response => this.brands = [{id: '0', name: 'Models'}, ...response],
      error: error => console.error()
    })
  }

  handleSelectedOptionChange(event: any | null) {
    if (event) 
    {
      const selectedOption = event.option;
      const typeOfOption = event.type;

      if(typeOfOption == 'Types')
      {
        this.typeNameSelected = selectedOption;
      } else if (typeOfOption == 'Brands'){
        this.brandNameSelected = selectedOption;
      }

      this.getVehicles();
    }
  }

  handleSelectedOptionUndo(event : null)
  {
    if(event)
    {
      if(event == 'Types')
      {
        this.typeNameSelected = ''
      }else if(event == 'Brands')
      {
        this.brandNameSelected = ''
      }

      this.getVehicles();
    }
  }
}

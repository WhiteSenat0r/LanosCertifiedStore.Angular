import { Component, OnInit } from '@angular/core';
import { Type } from "../shared/models/type";
import { Brand } from "../shared/models/brand";
import { CatalogService } from './catalog.service';
import { Vehicle } from '../shared/models/vehicle';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  types: Type[] = [];
  vehicles: Vehicle[] = [];
  
  typeNameSelected: string = '';

  constructor(private catalogService: CatalogService) { };

  ngOnInit(): void {
    this.getTypes();
    this.getVehicles();
  }

  getVehicles() {

    this.catalogService.getVehicles(this.typeNameSelected).subscribe({
      next: (response: any) => {
        this.vehicles = response.items;
      },
      error: error => console.error(),
      complete: () => console.log("Vehicles were successfully added"),
    });
  }

  getTypes() {
    this.catalogService.getTypes().subscribe({
      next: response => this.types = response,
      error: error => console.error()
    })
  }

  handleSelectedTypeChange(selectedType: Type | null) {
    if(selectedType != null)
    {
      this.typeNameSelected = selectedType.name;
      this.getVehicles();
    }
  }
}

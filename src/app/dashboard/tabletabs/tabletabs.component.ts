import { Component, OnInit } from '@angular/core';
import { Model } from '../../shared/models/model';
import { Brand } from '../../shared/models/brand';
import { Type } from '../../shared/models/type';
import { Color } from '../../shared/models/color';
import { DashboardService } from '../dashboard.service'; 


@Component({
  selector: 'app-tabletabs',
  templateUrl: './tabletabs.component.html',
  styleUrls: ['./tabletabs.component.css']
})
export class TabletabsComponent implements OnInit {

  models: Model[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  colors: Color[] = [];
  selectedBrandId: string = '';
  selectedModelId: string = '';
  isBrandSelected: boolean = false;
  isFormCleared: boolean = false;

  constructor(private dashboardService: DashboardService,) {

    
  }
  originalModels: Model[] = [];

  ngOnInit(): void {
    this.getModel();
    this.getTypes();
    this.getBrands();
    this.getColor();
  }

  getModel() {
    this.dashboardService.getModel().subscribe({
      next: response => {
        this.models = response;
        this.originalModels = [...response];
      },
      error: error => console.error(error),
      complete: () => console.log("GetData Models"),
    })
  }

  getTypes() {
    this.dashboardService.getTypes().subscribe({
      next: response => this.types = response,
      error: error => console.error(error),
      complete: () => console.log("GetData Types"),
    })
  }

  getBrands() {
    this.dashboardService.getBrands().subscribe({
      next: response => this.brands = response,
      error: error => console.error(error),
      complete: () => console.log("GetData Brands"),
    })
  }

  getColor() {
    this.dashboardService.getColor().subscribe({
      next: response => this.colors = response,
      error: error => console.error(error),
      complete: () => console.log("GetData Color"),
    })
  }


  onBrandChange() {
    const selectedBrand = this.brands.find(brand => brand.id === this.selectedBrandId);
    if (selectedBrand) {
      console.log('Choose brand:', selectedBrand);
      this.models = [...this.originalModels];

      this.models = this.models.filter(model => model.vehicleBrand === selectedBrand.name);
    } else {
      console.log('No found');
    }
  }

  
}



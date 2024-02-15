import { Component, OnInit } from '@angular/core';
import { Model } from '../shared/models/model';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { Color } from '../shared/models/color';
import { Displacement } from '../shared/models/displacement';
import { AddcarformService } from './addcarform.service';
import { Vehicle } from '../shared/models/vehicle';
import { Price } from '../shared/models/price';


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
  selectedBrandId: string = '';
  selectedModelId: string = '';
  formData: any = {};

  constructor(private addcarformService: AddcarformService) { }

  originalModels: Model[] = [];

  ngOnInit(): void {
    this.getModel();
    this.getTypes();
    this.getBrands();
    this.getColor();
    this.getDisplacement();
  }

  getModel() {
    this.addcarformService.getModel().subscribe({
      next: response => {
        this.models = response;
        this.originalModels = [...response];
      },
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
      next: response => this.displacements = response,
      error: error => console.error(error),
      complete: () => console.log("GetData Displacements"),
    })
  }

  addBrand(newBrandName: string) {
    this.addcarformService.addBrand(newBrandName).subscribe({
      next: response => {
        console.log('Brand added successfully:', response);
        this.getBrands();
      },
      error: error => console.error('Error adding brand:', error)
    });
  }

  addModel(newModelName: string) {
    if (!this.selectedBrandId || !newModelName) {
      console.error('Brand and model name must be selected.');
      return;
    }

    this.addcarformService.addModel(newModelName, this.selectedBrandId).subscribe({
      next: response => {
        console.log('Model successfully added:', response);
        this.getModel();
      },
      error: error => console.error('Error adding model:', error)
    });
  }

  addType(newTypeName: string) {
    this.addcarformService.addType(newTypeName).subscribe({
      next: response => {
        console.log('Type added successfully:', response);
        this.getTypes();
      },
      error: error => console.error('Error adding type:', error)
    });
  }

  addDisplacement(newDisplacementValue: string) {
    this.addcarformService.addDisplacement(newDisplacementValue).subscribe({
      next: response => {
        console.log('Displacement added successfully:', response);
        this.getDisplacement();
      },
      error: error => console.error('Error adding displacement:', error)
    });
  }

  addColor(newColorName: string) {
    this.addcarformService.addColor(newColorName).subscribe({
      next: response => {
        console.log('Color added successfully:', response);
        this.getColor();
      },
      error: error => console.error('Error adding color:', error)
    });
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

  onSubmit(form: any) {
    const formData = form.value;
  
    const newPrice: Price = {
      id: '',
      issueDate: '',
      value: formData.price
    };
  
    const newVehicle: Vehicle = {
      id: '',
      description: formData.description,
      brand: formData.brand,
      model: formData.model,
      color: formData.color,
      type: formData.type,
      displacement: formData.displacement,
      prices: [newPrice]
    };
  
    console.log('Дані, які будуть відправлені на сервер:', newVehicle);
  
    this.addcarformService.addVehicle(newVehicle).subscribe({
      next: response => {
        console.log('Vehicle added successfully:', response);
        form.reset();
      },
      error: error => console.error('Error adding vehicle:', error)
    });
  }
  
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Brand } from 'src/app/shared/models/brand';
import { Color } from 'src/app/shared/models/color';
import { CreateVehicle } from 'src/app/shared/models/createvehicle';
import { Model } from 'src/app/shared/models/model';
import { Type } from 'src/app/shared/models/type';
import { VehicleoperateService } from '../vehicleoperate.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent {
  onModelChange(event: any) {
    if (event.target.value)
    {
      const selectedModel = this.models.find(model => model.id === event.target.value.toString());
      if (selectedModel) {
        console.log('Choose model:', selectedModel);

        let modelAccessTypes: Type[] = selectedModel.availableTypes;

        let newTypes: Type[] = [];
        for(let i: number = 0;  i < modelAccessTypes.length;i++)
        {
          let filteredTypes: Type[] = [];
          filteredTypes = this.types.filter(type => type.id === modelAccessTypes[i].id);
         
          newTypes = newTypes.concat(filteredTypes);
        }

        this.types = newTypes;
      } else {
        console.log('No found');
      }
    }
  }
  addCarForm: FormGroup;

  models: Model[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  colors: Color[] = [];
  isBrandSelected: boolean = false;
  isFormCleared: boolean = false;
  showAlert: boolean = false;


  constructor(private vehicleoperateService: VehicleoperateService, private router: Router) {
    this.addCarForm = new FormGroup({
      brand: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      displacement: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      description: new FormControl('', Validators.required)
    });
  }

  originalModels: Model[] = [];

  ngOnInit(): void {
    this.getModel();
    this.getTypes();
    this.getBrands();
    this.getColor();
  }

  getModel() {
    this.vehicleoperateService.getModel().subscribe({
      next: response => {
        this.models = response;
        this.originalModels = [...response];
      },
      error: error => console.error(error),
    })
  }

  getTypes() {
    this.vehicleoperateService.getTypes().subscribe({
      next: response => this.types = response,
      error: error => console.error(error),
    })
  }

  getBrands() {
    this.vehicleoperateService.getBrands().subscribe({
      next: response => this.brands = response,
      error: error => console.error(error),
    })
  }

  getColor() {
    this.vehicleoperateService.getColor().subscribe({
      next: response => this.colors = response,
      error: error => console.error(error),
    })
  }

  onBrandChange(event: any) {
    if (event.target.value)
    {
      const selectedBrand = this.brands.find(brand => brand.id === event.target.value.toString());
      if (selectedBrand) {
        console.log('Choose brand:', selectedBrand);
        this.models = [...this.originalModels];

        this.models = this.models.filter(model => model.vehicleBrand === selectedBrand.name);
      } else {
        console.log('No found');
      }
    }
    
  }

  onSubmit(form: FormGroup) {
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }
  
    const addCarForm = form.value;
    const newVehicle: CreateVehicle = {
      description: addCarForm.description,
      brand: addCarForm.brand,
      model: addCarForm.model,
      color: addCarForm.color,
      type: addCarForm.type,
      displacement: addCarForm.displacement,
      prices: addCarForm.price
    };
  
    this.vehicleoperateService.addVehicle(newVehicle).subscribe({
      next: response => {
        console.log('Vehicle added successfully:', response);
        form.reset();
        this.showAlert = true; 

        let vehicleId: string = response.toString();
        this.router.navigateByUrl(`vehicleoperate/addvehicle/${vehicleId}`)
      },
      error: error => console.error('Error adding vehicle:', error)
    });
  }
  
  clearForm() {
    this.addCarForm.reset();
    this.isFormCleared = true;
    this.showAlert = false; 
  }
}

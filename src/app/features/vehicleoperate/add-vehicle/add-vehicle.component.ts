import { Component, OnInit } from '@angular/core';
import { VehicleoperateService } from '../vehicleoperate.service';
import { Brand } from 'src/app/shared/models/brand';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OptionIdentity } from 'src/app/shared/models/optionIdentity';
import { OptionTypePair } from 'src/app/shared/models/optionTypePair';
import { VehicleParams } from 'src/app/shared/models/vehicleParams';
import { Type } from 'src/app/shared/models/type';
import { Model } from 'src/app/shared/models/model';
import { Router } from '@angular/router';
import { CreateVehicle } from 'src/app/shared/models/createvehicle';
import { Color } from 'src/app/shared/models/color';
@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  formSubmitted: boolean = false;

  editor: Editor = new Editor();
  toolbar: Toolbar = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  vehicleParams: VehicleParams = new VehicleParams();
  brands: Brand[] = [{ id: '1', name: 'lol' }, { id: '2', name: 'nimo' }, { id: '3', name: 'dsd' }];
  types: Type[] = [{ id: '1', name: 'dsewqe' }, { id: '2', name: 'trtrd' }, { id: '3', name: 'csl' }];
  colors: Color[] = [{ id: '1', name: 'white', hexValue: '#000' }, { id: '2', name: 'black', hexValue: '#fff' }, { id: '3', name: 'blue', hexValue: '#f3f3f3' }];
  models: Model[] = [{ id: '1', name: 'dsewqe', vehicleBrand: '', availableTypes: [] }, { id: '2', name: 'trtrd', vehicleBrand: '', availableTypes: [] }, { id: '3', name: 'csl', vehicleBrand: '', availableTypes: [] }];
  years: OptionIdentity[] = [{ id: '1', name: '1990' }, { id: '2', name: '1991' }, { id: '3', name: '1992' }];


  form: FormGroup;
  constructor(private vehicleOperateService: VehicleoperateService, private formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group({
      types: ['', Validators.required],
      brands: ['', Validators.required],
      models: ['', Validators.required],
      years: ['', Validators.required],
      colors: ['', Validators.required],
      editorContent: ['', [Validators.required, Validators.minLength(30)]]
    }
    )
  }
  ngOnInit(): void {
    //this.getBrands();
    //this.getTypes();

    console.log(this.form.get('types')?.invalid)
  }


  getBrands() {
    this.vehicleOperateService.getBrands().subscribe({
      next: (response: Brand[]) => this.brands = response,
      error: (error) => console.error(error)
    })
  }

  getTypes() {
    this.vehicleOperateService.getTypes().subscribe({
      next: (response: Type[]) => this.types = response,
      error: (error) => console.error(error)
    })
  }

  handleSelectedOptionChange(event: OptionTypePair<OptionIdentity>) {
    const typeName: string | undefined = event.type?.toLocaleLowerCase();
    const option: OptionIdentity = event.data;
    if (typeName && option) {
      if (typeName === 'Type'.toLocaleLowerCase()) {
        this.vehicleParams.typeName = option.name;
      }
      if (typeName === 'Brand'.toLocaleLowerCase()) {
        this.vehicleParams.brandName = option.name;
      }
      if (typeName === 'Model'.toLocaleLowerCase()) {
        this.vehicleParams.modelName = option.name;
      }
      if (typeName === 'Color'.toLocaleLowerCase()) {
        this.vehicleParams.colorName = option.name;
      }
      if (typeName === 'Year'.toLocaleLowerCase()) {
        this.vehicleParams.year = option.name;
      }
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    console.log('submitted form', this.form.value, this.form.invalid);
    window.scroll(0, 0);


    if (this.form.valid) {
      const newVehicle: CreateVehicle = new CreateVehicle('кабріолет', 'Audi', 'A6', 'чорний', 1000, 20000, 'descriptiondasjjasdlkjasdlasjdlkjasdaskdljaskdljkasjkdaljkdajksdkvndslknvnk');

      this.vehicleOperateService.addVehicle(newVehicle);
      this.router.navigate([`addvehiclephoto/${0}`]);
    }
  }
}

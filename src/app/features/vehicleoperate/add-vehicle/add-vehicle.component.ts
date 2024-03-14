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
import { Pagination } from 'src/app/shared/models/pagination';
@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css'],
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
  brands: Brand[] = [];
  types: Type[] = [];
  colors: Color[] = [];
  models: Model[] = [];
  years: OptionIdentity[] = [
    { id: '1', name: '1990' },
    { id: '2', name: '1991' },
    { id: '3', name: '1992' },
    // Додайте роки від 1993 до 2024
    { id: '4', name: '1993' },
    { id: '5', name: '1994' },
    { id: '6', name: '1995' },
    { id: '7', name: '1996' },
    { id: '8', name: '1997' },
    { id: '9', name: '1998' },
    { id: '10', name: '1999' },
    { id: '11', name: '2000' },
    { id: '12', name: '2001' },
    { id: '13', name: '2002' },
    { id: '14', name: '2003' },
    { id: '15', name: '2004' },
    { id: '16', name: '2005' },
    { id: '17', name: '2006' },
    { id: '18', name: '2007' },
    { id: '19', name: '2008' },
    { id: '20', name: '2009' },
    { id: '21', name: '2010' },
    { id: '22', name: '2011' },
    { id: '23', name: '2012' },
    { id: '24', name: '2013' },
    { id: '25', name: '2014' },
    { id: '26', name: '2015' },
    { id: '27', name: '2016' },
    { id: '28', name: '2017' },
    { id: '29', name: '2018' },
    { id: '30', name: '2019' },
    { id: '31', name: '2020' },
    { id: '32', name: '2021' },
    { id: '33', name: '2022' },
    { id: '34', name: '2023' },
    { id: '35', name: '2024' },
  ];

  form: FormGroup;
  constructor(
    private vehicleOperateService: VehicleoperateService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      types: ['', Validators.required],
      brands: ['', Validators.required],
      models: ['', Validators.required],
      years: ['', Validators.required],
      colors: ['', Validators.required],
      price: ['', Validators.required],
      displacement: ['', Validators.required],
      editorContent: ['', [Validators.required, Validators.minLength(30)]],
    });
  }

  ngOnInit(): void {
    this.getBrands();
    this.getTypes();
    this.getColors();
  }

  getTypes() {
    this.vehicleOperateService.getTypes().subscribe({
      next: (response: Pagination<Type>) => (this.types = response.items),
      error: (error) => console.error(error),
    });
  }

  getBrands() {
    this.vehicleOperateService.getBrands().subscribe({
      next: (response: Pagination<Brand>) => (this.brands = response.items),
      error: (error) => console.error(error),
    });
  }

  getModels() {
    this.vehicleOperateService.getModels().subscribe({
      next: (response: Pagination<Model>) =>
        (this.models = response.items.filter(
          (model: Model) => model.vehicleBrand === this.vehicleParams.brandName
        )),
      error: (error) => console.error(error),
    });
  }

  getColors() {
    this.vehicleOperateService.getColors().subscribe({
      next: (response: Pagination<Color>) => (this.colors = response.items),
      error: (error) => console.error(error),
    });
  }

  handleSelectedOptionChange(event: OptionTypePair<OptionIdentity>) {
    const typeName: string | undefined = event.type?.toLocaleLowerCase();
    const option: OptionIdentity = event.data;
    if (typeName && option) {
      if (typeName === 'Type'.toLocaleLowerCase()) {
        this.vehicleParams.typeId = option.id;
        this.vehicleParams.typeName = option.name;
      }
      if (typeName === 'Brand'.toLocaleLowerCase()) {
        this.vehicleParams.brandId = option.id;
        this.vehicleParams.brandName = option.name;
        this.getModels();
      }
      if (typeName === 'Model'.toLocaleLowerCase()) {
        this.vehicleParams.modelId = option.id;
        this.vehicleParams.modelName = option.name;
      }
      if (typeName === 'Color'.toLocaleLowerCase()) {
        this.vehicleParams.colorId = option.id;
        this.vehicleParams.colorName = option.name;
      }
      if (typeName === 'Year'.toLocaleLowerCase()) {
        this.vehicleParams.year = option.name;
      }
    }
  }
  onSubmit() {
    this.formSubmitted = true;
    console.log('Form state!', this.form.value, this.form.invalid);
    window.scroll(0, 0);

    if (this.form.valid) {
      const newVehicle: CreateVehicle = new CreateVehicle(
        this.vehicleParams.typeId,
        this.vehicleParams.brandId,
        this.vehicleParams.modelId,
        this.vehicleParams.colorId,
        this.form.get('displacement')!.value,
        this.form.get('price')!.value,
        this.form.get('editorContent')!.value
      );

      this.vehicleOperateService.addVehicle(newVehicle).subscribe({
        next: (response: string) => {
          const vehicleId: string = response;
          this.router.navigateByUrl('/vehicleoperate/addvehiclephoto/' + vehicleId);
        },
        error: (error) => console.error(error),
      });
    }
  }
}

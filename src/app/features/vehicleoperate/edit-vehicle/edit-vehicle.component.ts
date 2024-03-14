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
import { ActivatedRoute, Router } from '@angular/router';
import { CreateVehicle } from 'src/app/shared/models/createvehicle';
import { Color } from 'src/app/shared/models/color';
import { Pagination } from 'src/app/shared/models/pagination';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css']
})
export class EditVehicleComponent {
  idVehicle: string = '';
  formSubmitted: boolean = false;
  shouldShowPopover: boolean = false;

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
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      types: ['', Validators.required],
      brands: ['', Validators.required],
      models: ['', Validators.required],
      years: ['2001', Validators.required],
      colors: ['', Validators.required],
      price: ['', Validators.required],
      displacement: ['', Validators.required],
      editorContent: ['', [Validators.required, Validators.minLength(30)]],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['brandName'] !== undefined) {
        this.vehicleParams.brandName = params['brandName'];
        this.form.get('brands')?.setValue(params['brandName']);
        if (params['typeName'] !== undefined) {
          this.vehicleParams.typeName = params['typeName'];
          this.form.get('types')?.setValue(params['typeName']);
          if (params['modelName'] !== undefined) {
            this.vehicleParams.modelName = params['modelName'];
            this.form.get('models')?.setValue(params['modelName']);
              this.getModels();
          }
        }
      }
      if (params['colorName'] !== undefined) {
        this.vehicleParams.colorName = params['colorName'];
        this.form.get('colors')?.setValue(params['colorName']);
      }

      if (params['price'] !== undefined) {
        this.form.get('price')?.setValue(params['price']);
      }
      if (params['displacement'] !== undefined) {
        this.form.get('displacement')?.setValue(params['displacement']);
      }

      if (params['description'] !== undefined) {
        this.form.get('editorContent')?.setValue(params['description']);
      }

      if (params['vehicleId'] !== undefined) {
        this.idVehicle = params['vehicleId'];
      }
    });

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
          (model: Model) => {
            if(model.vehicleBrand === this.vehicleParams.brandName)
            {
              for(let type of model.availableTypes)
              {
                if(type.name === this.vehicleParams.typeName)
                {
                  return true
                }
              }
            }
            return false;
          }
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

  togglePopover(){
    if(this.vehicleParams.brandName === '')
    {
      this.shouldShowPopover = true;
    }
    else{
      if(this.shouldShowPopover )
      {
        this.shouldShowPopover = !this.shouldShowPopover;
      }
    }
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
  
  handleClickModelDropDownTypeahead(value: boolean) : void
  {
    if(value === false)
    {
      this.shouldShowPopover = false
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    console.log('Form state!', this.form.value, this.form.invalid);
    window.scroll(0, 0);

    for(const item of this.types)
    {
      if(this.vehicleParams.typeName === item.name)
      {
        this.vehicleParams.typeId = item.id;
        break;
      }
    }
    for(const item of this.brands)
    {
      if(this.vehicleParams.brandName === item.name)
      {
        this.vehicleParams.brandId = item.id;
        break;
      }
    }
    for(const item of this.models)
    {
      if(this.vehicleParams.modelName === item.name)
      {
        this.vehicleParams.modelId = item.id;
        break;
      }
    }
    for(const item of this.colors)
    {
      if(this.vehicleParams.colorName === item.name)
      {
        this.vehicleParams.colorId = item.id;
        break;
      }
    }

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

      this.vehicleOperateService.editVehicle(newVehicle, this.idVehicle).subscribe({
        next: (response: string) => {
          const vehicleId: string = response;
          this.router.navigateByUrl('/');
        },
        error: (error) => console.error(error),
      });
    }
  }
}

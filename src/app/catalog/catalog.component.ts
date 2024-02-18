import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Type } from '../shared/models/type';
import { Brand } from '../shared/models/brand';
import { CatalogService } from './catalog.service';
import { Vehicle } from '../shared/models/vehicle';
import { Model } from '../shared/models/model';
import { CatalogParams } from '../shared/models/catalogParams';
import { Color } from '../shared/models/color';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit, AfterViewInit {
  @ViewChild('min_val') minVal!: ElementRef;
  @ViewChild('max_val') maxVal!: ElementRef;
  @ViewChild('price_input_min') priceInputMin!: ElementRef;
  @ViewChild('price_input_max') priceInputMax!: ElementRef;

  minGap: number = 7500;
  sliderMinValue: number = 0;
  sliderMaxValue: number = 0;

  @ViewChild('slider_track') sliderRange!: ElementRef;
  sliderRangeElement: any;

  slideMin() {
    let gap =
      parseInt(this.maxVal.nativeElement.value) -
      parseInt(this.minVal.nativeElement.value);

    if(gap <= this.minGap)
    {
      this.minVal.nativeElement.value = parseInt(this.maxVal.nativeElement.value) - this.minGap;
    }
    this.priceInputMin.nativeElement.value = parseInt(this.minVal.nativeElement.value);
    this.catalogParams.lowerPriceLimit = this.priceInputMin.nativeElement.value;
    this.setArea();
    this.updateVehicles$.next();
  }

  slideMax() {
    let gap =
      parseInt(this.maxVal.nativeElement.value) -
      parseInt(this.minVal.nativeElement.value);

    if(gap <= this.minGap)
    {
      this.maxVal.nativeElement.value = parseInt(this.minVal.nativeElement.value) + this.minGap;
    }
    this.priceInputMax.nativeElement.value = parseInt(this.maxVal.nativeElement.value);
    this.catalogParams.upperPriceLimit = this.priceInputMax.nativeElement.value;
    this.setArea();
    this.updateVehicles$.next();
  }

  setArea()
  {
    this.sliderRangeElement.style.left = ((this.catalogParams.lowerPriceLimit / this.sliderMaxValue) * 100).toString() + "%";
    this.sliderRangeElement.style.right = (100 - (this.catalogParams.upperPriceLimit / this.sliderMaxValue) * 100).toString() + "%";
  }

  types: Type[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  models: Model[] = [];
  vehicles: Vehicle[] = [];

  testFuntionalityVariable: boolean = false;

  columnCount: number = 3;

  catalogParams = new CatalogParams();
  totalCountItems: number = 0;

  sortTypes = [
    { name: 'Нормальне сортування', value: '' },
    { name: 'За зростанням', value: 'price-asc' },
    { name: 'За спаданням', value: 'price-desc' },
  ];

  constructor(private catalogService: CatalogService) {  }

  updateVehicles$ = new Subject<void>();

  ngOnInit(): void {
    this.getTypes();
    this.getVehicles();
    this.getBrands();
    this.getColors();

    this.updateVehicles$.pipe(
      debounceTime(500)
    )
    .subscribe(() => {
      this.getVehicles(); 
    });
  }

  ngAfterViewInit(): void {
    this.sliderMinValue = this.catalogParams.lowerPriceLimit;
    this.sliderMaxValue = this.catalogParams.upperPriceLimit;
    this.sliderRangeElement = this.sliderRange.nativeElement;
    this.setArea();
  }

  getVehicles() {
    this.catalogService.getVehicles(this.catalogParams).subscribe({
      next: (response: any) => {
        this.vehicles = response.items;

        this.catalogParams.pageNumber = response.pageIndex;
        this.totalCountItems = response.totalFilteredItemsQuantity;
      },
      error: (error) => console.error(error),
    });
  }

  getTypes() {
    this.catalogService.getTypes().subscribe({
      next: (response) =>
        (this.types = [{ id: '0', name: 'Типи' }, ...response]),
      error: (error) => console.error(error),
    });
  }

  getColors() {
    this.catalogService.getColors().subscribe({
      next: (response) =>
        (this.colors = [{ id: '0', name: 'Кольори' }, ...response]),
      error: (error) => console.error(error),
    });
  }

  getBrands() {
    this.catalogService.getBrands().subscribe({
      next: (response) =>
        (this.brands = [{ id: '0', name: 'Бренди' }, ...response]),
      error: (error) => console.error(error),
    });
  }

  getModels() {
     this.catalogService.getModels().subscribe({
       next: (response:any) => {
        this.models = [{ id: '0', name: 'Моделі' },...response.filter((model: Model) => (model.vehicleBrand === this.catalogParams.brandName))];
       },
       error: error => console.error(error),
     });
   }

  handleSelectedOptionChange(event: any | null) {
    if (event) {
      const selectedOption = event.option;
      const typeOfOption = event.type;

      if (typeOfOption == 'Типи') {
        this.catalogParams.typeName = selectedOption;
      } else if (typeOfOption == 'Бренди') {
        this.catalogParams.brandName = selectedOption;
        this.getModels();
        this.testFuntionalityVariable = true;
      } else if (typeOfOption == 'Кольори') {
        this.catalogParams.colorName = selectedOption;
      } else if (typeOfOption == 'Моделі') {
        this.catalogParams.modelName = selectedOption;
      }

      this.getVehicles();
    }
  }

  handleSelectedOptionUndo(event: null) {
    if (event) {
      if (event == 'Типи') {
        this.catalogParams.typeName = '';
      } else if (event == 'Бренди') {
        this.catalogParams.brandName = '';
        this.testFuntionalityVariable = false;
      } else if (event == 'Кольори') {
        this.catalogParams.colorName = '';
      } else if (event == 'Моделі') {
        this.catalogParams.modelName = '';
      }

      this.getVehicles();
    }
  }

  handleSelectedSortTypeChange(event: any | null) {
    this.catalogParams.sort = event.type.value;
    this.getVehicles();
  }

  handleSelectedViewChange(event: any | null) {
    this.columnCount = event;
  }

  changeElCountPerPage(event: any) {
    if (event.target.value != '') {
      this.catalogParams.pageSize = event.target.value;
    } else {
      this.catalogParams.pageSize = 100;
    }

    this.getVehicles();
  }

  changePriceUpperLimit(event: any) {
    this.catalogParams.upperPriceLimit = parseInt(event.target.value);
    this.setArea();
    this.updateVehicles$.next();
  }

  changePriceLowerLimit(event: any) {
    this.catalogParams.lowerPriceLimit = parseInt(event.target.value);
    this.setArea();
    this.updateVehicles$.next();
  }

  handleMinimalDateChange(minimalPriceDate: Date): void {
    this.catalogParams.minimalPriceDate = minimalPriceDate;
    this.getVehicles();
  }

  handlePageNumberChange(pageNumber: any) {
    this.catalogParams.pageNumber = pageNumber;
    this.getVehicles();
  }

  handlePageSizeChange(pageSize: any) {
    this.catalogParams.pageSize = pageSize;
    this.getVehicles();
  }

  onChipClick(name: string) {
    if (name) {
      if (name === 'type') {
        this.catalogParams.typeName = '';
        this.getTypes();
      }
      if (name === 'brand') {
        this.catalogParams.brandName = '';
        this.catalogParams.modelName = '';
        this.testFuntionalityVariable = false;
        this.getBrands();
      }
      if (name === 'model') {
        this.catalogParams.modelName = '';
        this.getModels();
      }
      if (name === 'color') {
        this.catalogParams.colorName = '';
        this.getColors();
      }

      this.getVehicles();
    }
  }

  onCancelClick() {
    this.catalogParams = new CatalogParams();
    this.getTypes();
    this.getBrands();
    this.getColors();
    this.getVehicles();
    this.setArea();
  }
}

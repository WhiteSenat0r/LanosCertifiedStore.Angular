import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Type } from '../shared/models/type';
import { Brand } from '../shared/models/brand';
import { CatalogService } from './catalog.service';
import { Vehicle } from '../shared/models/vehicle';
import { Model } from '../shared/models/model';
import { CatalogParams } from '../shared/models/catalogParams';
import { Color } from '../shared/models/color';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  types: Type[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  models: Model[] = [];
  vehicles: Vehicle[] = [];

  columnCount: number = 3;

  catalogParams = new CatalogParams();
  totalCountItems: number = 0;

  sortTypes = [
    { name: 'Нормальне сортування', value: '' },
    { name: 'За зростанням', value: 'price-asc' },
    { name: 'За спаданням', value: 'price-desc' },
  ];

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.getTypes();
    this.getVehicles();
    this.getBrands();
    this.getColors();
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

  // getModels() {
  //   this.catalogService.getModels().subscribe({
  //     next: response => this.brands = [{id: '0', name: 'Models'}, ...response],
  //     error: error => console.error()
  //   })
  // }

  handleSelectedOptionChange(event: any | null) {
    if (event) {
      const selectedOption = event.option;
      const typeOfOption = event.type;

      if (typeOfOption == 'Типи') {
        this.catalogParams.typeName = selectedOption;
      } else if (typeOfOption == 'Бренди') {
        this.catalogParams.brandName = selectedOption;
      } else if (typeOfOption == 'Кольори') {
        console.log(true);
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

  changeElCountPerPage(event: any)
  {
    if(event.target.value != '')
    {
      this.catalogParams.pageSize = event.target.value;
    }
    else{
      this.catalogParams.pageSize = 100;
    }
    
    this.getVehicles();
  }

  changePriceUpperLimit(event: any)
  {
    this.catalogParams.upperPriceLimit = parseInt(event.target.value);
    this.getVehicles();
  }

  changePriceLowerLimit(event: any)
  {
    this.catalogParams.lowerPriceLimit = parseInt(event.target.value);
    this.getVehicles();
  }

  onMinimalDateEnter(event: any): void {
    this.catalogParams.minimalPriceDate = new Date(event.target.value);
    this.getVehicles();
  }

  handlePageNumberChange(pageNumber : any){
    this.catalogParams.pageNumber = pageNumber;
    this.getVehicles();
  }

  handlePageSizeChange(pageSize: any)
  {
    this.catalogParams.pageSize = pageSize;
    this.getVehicles();
  }
}

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
handleInputColorValue(input: string) {
  this.filteredColors = this.colors.filter((color) =>
      color.name
        .toLowerCase()
        .includes(input.toLowerCase())
    );
    this.filteredColors.unshift({ id: '0', name: 'Colors' });
}
  filteredColors: Color[] = [];

  types: Type[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  models: Model[] = [];
  vehicles: Vehicle[] = [];

  //custom for pagination
  columnCount: number = 3;

  catalogParams = new CatalogParams();
  totalCountItems: number = 0;

  sortTypes = [
    { name: 'No sorting', value: '' },
    { name: 'Low to high', value: 'price-asc' },
    { name: 'High to low', value: 'price-desk' },
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
        this.catalogParams.pageSize = response.currentPageItemsQuantity;
        this.totalCountItems = response.totalItemsQuantity;
      },
      error: (error) => console.error(),
    });
  }

  getTypes() {
    this.catalogService.getTypes().subscribe({
      next: (response) =>
        (this.types = [{ id: '0', name: 'Types' }, ...response]),
      error: (error) => console.error(),
    });
  }

  getColors() {
    this.catalogService.getColors().subscribe({
      next: (response) => {
        this.colors = [{ id: '0', name: 'Colors' }, ...response];
        if(this.filteredColors.length === 0)
        {
          this.filteredColors = this.colors;
        }
      },
      error: (error) => console.error(),
    });
  }

  getBrands() {
    this.catalogService.getBrands().subscribe({
      next: (response) =>
        (this.brands = [{ id: '0', name: 'Brands' }, ...response]),
      error: (error) => console.error(),
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

      if (typeOfOption == 'Types') {
        this.catalogParams.typeName = selectedOption;
      } else if (typeOfOption == 'Brands') {
        this.catalogParams.brandName = selectedOption;
      } else if (typeOfOption == 'Colors') {
        this.catalogParams.colorName = selectedOption;
      }

      this.getVehicles();
    }
  }

  handleSelectedOptionUndo(event: null) {
    if (event) {
      if (event == 'Types') {
        this.catalogParams.typeName = '';
      } else if (event == 'Brands') {
        this.catalogParams.brandName = '';
      } else if (event == 'Colors') {
        this.catalogParams.colorName = '';
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
    console.log(event + ' ' + this.columnCount);
  }
}

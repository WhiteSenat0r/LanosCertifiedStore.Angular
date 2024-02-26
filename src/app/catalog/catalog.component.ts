import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Type } from '../shared/models/type';
import { Brand } from '../shared/models/brand';
import { CatalogService } from './catalog.service';
import { Model } from '../shared/models/model';
import { CatalogParams } from '../shared/models/catalogParams';
import { Color } from '../shared/models/color';
import { Subject, debounceTime, last, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from '../shared/models/pagination';
import { ListVehicle } from '../shared/models/ListVehicle';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit{

  types: Type[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  models: Model[] = [];
  vehicles: ListVehicle[] = [];

  testFuntionalityVariable: boolean = false;

  columnCount: number = 3;

  catalogParams = new CatalogParams();
  totalCountItems: number = 0;

  date: string = new Date(2001,1,1).toString();

  sortTypes = [
    { name: 'Нормальне сортування', value: '' },
    { name: 'За зростанням', value: 'price-asc' },
    { name: 'За спаданням', value: 'price-desc' },
  ];

  constructor(private catalogService: CatalogService, private route: ActivatedRoute) {  }

  updateLowerPrice$ = new Subject<number>();
  updateUpperPrice$ = new Subject<number>();

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.queryParams.subscribe(params => {
      if(params['brandName'] !== undefined)
      {
        this.catalogParams.brandName = params['brandName'];
      }
      if(params['modelName'] !== undefined)
      {
        this.catalogParams.modelName = params['modelName'];
      }
      if(this.catalogParams.brandName !== '')
      {
        this.testFuntionalityVariable = true;
        this.getModels();
      }
      if(params['typeName'] !== undefined)
      {
        this.catalogParams.typeName = params['typeName'];
      }
    });

    this.getTypes();
    this.getVehicles();
    this.getBrands();
    this.getColors();

    this.updateLowerPrice$.pipe(
      debounceTime(500),
      tap((price: number) => {
        this.catalogParams.lowerPriceLimit = price;
      })
    )
    .subscribe(() => {
      this.getVehicles();
    });

    this.updateUpperPrice$.pipe(
      debounceTime(500),
      tap((price: number) => {
        this.catalogParams.upperPriceLimit = price;
      })
    )
    .subscribe(() => {
      this.getVehicles();
    });
  }

  getVehicles() {
    this.catalogService.getVehicles(this.catalogParams).subscribe({
      next: (response: Pagination<ListVehicle[]>) => {
        this.vehicles = response.items;

        //НУ БЕК ПРОСТО ЗАЖАВ!!! 
        // let ourPriceUpper: number = response.items[0].prices[0].value;
        // let ourPriceLower: number = response.items[0].prices[0].value;

        // for(let i: number = 1; i < response.items.length;i++)
        // {
        //     if(response.items[i].prices[0].value > ourPriceUpper)
        //     {
        //       ourPriceUpper = response.items[i].prices[0].value 
        //     }
        //     if(response.items[i].prices[0].value < ourPriceLower)
        //     {
        //       ourPriceLower = response.items[i].prices[0].value
        //     }
        // }

        // this.catalogParams.lowerPriceLimit = ourPriceLower;
        // this.catalogParams.upperPriceLimit = ourPriceUpper;

        this.catalogParams.pageNumber = response.pageIndex;
        this.totalCountItems = response.totalFilteredItemsCount;
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
        (this.colors = [{ id: '0', name: 'Кольори', hexValue: "" }, ...response]),
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
        this.catalogParams.modelName = '';
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

  handleChangeLowerPriceLimit(price: number | null) {
    if(price !== null)
    {
      this.updateLowerPrice$.next(price);
    }
  }

  handleChangeUpperPriceLimit(price: number | null) {
    if(price !== null)
    {
      this.updateUpperPrice$.next(price);
    }
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
      if (name === 'lowerPriceLimit') {
        this.catalogParams.lowerPriceLimit = 0;
        
      }
      if (name === 'upperPriceLimit') {
        this.catalogParams.upperPriceLimit = 100000;
      }
      if (name === 'minimalPriceDate') {
        this.catalogParams.minimalPriceDate = new Date(2001,1,1);
      }

      this.getVehicles();
    }
  }

  onCancelClick() {
    this.catalogParams = new CatalogParams();
    this.testFuntionalityVariable = false;
    this.getTypes();
    this.getBrands();
    this.getColors();
    this.getVehicles();
  }
}

import {
  Component,
  OnInit,
} from '@angular/core';
import { Type } from '../../shared/models/type';
import { Brand } from '../../shared/models/brand';
import { CatalogService } from './catalog.service';
import { Model } from '../../shared/models/model';
import { CatalogParams } from '../../shared/models/catalogParams';
import { Color } from '../../shared/models/color';
import { Subject, debounceTime, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from '../../shared/models/pagination';
import { CatalogVehicle } from '../../shared/models/CatalogVehicle';
import { OptionIdentity } from '../../shared/models/optionIdentity';
import { OptionTypePair } from '../../shared/models/optionTypePair';

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
  vehicles: CatalogVehicle[] = [];

  columnCount: number = 3;
  shouldShowPopover: boolean = false;
  
  totalCountItems: number = 0;
  catalogParams = new CatalogParams();

  sortTypes = [
    { name: 'Нормальне сортування', value: '' },
    { name: 'За зростанням', value: 'price-asc' },
    { name: 'За спаданням', value: 'price-desc' },
  ];

  constructor(
    private catalogService: CatalogService,
    private route: ActivatedRoute,
  ) {}

  updateLowerPrice$ = new Subject<number>();
  updateUpperPrice$ = new Subject<number>();

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.queryParams.subscribe((params) => {
      if (params['brandName'] !== undefined) {
        this.catalogParams.brandName = params['brandName'];
        if (params['modelName'] !== undefined) {
          this.catalogParams.modelName = params['modelName'];
          this.getModels();
        }
      }
      if (params['typeName'] !== undefined) {
        this.catalogParams.typeName = params['typeName'];
      }
      if (params['colorName'] !== undefined) {
        this.catalogParams.colorName = params['colorName'];
      }
    });

    this.getTypes();
    this.getVehicles();
    this.getBrands();
    this.getColors();

    this.updateLowerPrice$
      .pipe(
        debounceTime(500),
        tap((price: number) => {
          this.catalogParams.lowerPriceLimit = price;
        })
      )
      .subscribe(() => {
        this.getVehicles();
      });

    this.updateUpperPrice$
      .pipe(
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
      next: (response: Pagination<CatalogVehicle>) => {
        this.vehicles = response.items;
        this.catalogParams.pageNumber = response.pageIndex;
        this.totalCountItems = response.totalFilteredItemsCount;
      },
      error: (error) => console.error(error),
    });
  }

  getTypes() {
    this.catalogService.getTypes().subscribe({
      next: (response: Pagination<Type>) => (this.types = response.items),
      error: (error) => console.error(error),
    });
  }

  getColors() {
    this.catalogService.getColors().subscribe({
      next: (response: Pagination<Color>) => (this.colors = response.items),
      error: (error) => console.error(error),
    });
  }

  getBrands() {
    this.catalogService.getBrands().subscribe({
      next: (response: Pagination<Brand>) => (this.brands = response.items),
      error: (error) => console.error(error),
    });
  }

  getModels() {
    this.catalogService.getModels().subscribe({
      next: (response: Pagination<Model>) =>
        (this.models = response.items.filter(
          (model: Model) => model.vehicleBrand === this.catalogParams.brandName
        )),
      error: (error) => console.error(error),
    });
  }

  togglePopover(){
    if(this.catalogParams.brandName === '')
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

  handleSelectedChipClick(chip: string) {
    if (chip === 'type') {
      this.catalogParams.typeName = '';
      this.getTypes();
    }
    if (chip === 'brand') {
      this.catalogParams.brandName = '';
      this.catalogParams.modelName = '';
      this.getBrands();
      this.getModels();
    }
    if (chip === 'model') {
      this.catalogParams.modelName = '';
      this.getModels();
    }
    if (chip === 'color') {
      this.catalogParams.colorName = '';
      this.getColors();
    }
    if (chip === 'lowerPriceLimit') {
      this.catalogParams.lowerPriceLimit = 0;
    }
    if (chip === 'upperPriceLimit') {
      this.catalogParams.upperPriceLimit = 100000;
    }
    if (chip === 'minimalPriceDate') {
      this.catalogParams.minimalPriceDate = new Date(2001, 1, 1);
    }
    if (chip === 'cancel') {
      this.catalogParams = new CatalogParams();
    }
    this.getVehicles();
  }

  handleSelectedOptionChange(output: OptionTypePair<OptionIdentity>) {
    if (output) {
      let typeOfOption = output.type;
      const selectedOption = output.data.name;
      if (typeOfOption) {
        typeOfOption = typeOfOption.toLocaleLowerCase();
        if (typeOfOption === 'Type'.toLocaleLowerCase()) {
          this.catalogParams.typeName = selectedOption;
        } else if (typeOfOption === 'Brand'.toLocaleLowerCase()) {
          this.catalogParams.brandName = selectedOption;
          this.getModels();
        } else if (typeOfOption === 'Color'.toLocaleLowerCase()) {
          this.catalogParams.colorName = selectedOption;
        } else if (typeOfOption === 'Model'.toLocaleLowerCase()) {
          this.catalogParams.modelName = selectedOption;
        }
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
    if (price !== null) {
      this.updateLowerPrice$.next(price);
    }
  }

  handleChangeUpperPriceLimit(price: number | null) {
    if (price !== null) {
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

  handleClickModelDropDownTypeahead(value: boolean) : void
  {
    if(value === false)
    {
      this.shouldShowPopover = false
    }
  }
}

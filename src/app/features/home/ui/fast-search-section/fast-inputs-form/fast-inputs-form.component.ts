import { Component, AfterViewInit, Input, ViewChild, ElementRef, ChangeDetectorRef, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { DropdownElementData } from "../../../models/enums/DropdownElementData.enum";
import { DropdownHeaderData } from "../../../models/interfaces/DropdownHeaderData.interface";
import { PriceRange } from "../../../models/interfaces/PriceRange.interface";
import { SearchAdvancedParams } from "../../../models/interfaces/SearchAdvancedParams.interface";


@Component({
  selector: 'app-fast-inputs-form',
  templateUrl: './fast-inputs-form.component.html',
  styleUrl: './fast-inputs-form.component.css',
})
export class FastInputsFormComponent implements AfterViewInit {
  gridDivArraysInfo: DropdownHeaderData[] = [
    {
      iconUrl: 'calendar',
      info: 'Оберіть Рік',
      ApiCallOption: DropdownElementData.year,
    },
    {
      iconUrl: 'car-2000',
      info: 'Оберіть Бренд',
      ApiCallOption: DropdownElementData.brand,
    },
    {
      iconUrl: 'car-change',
      info: 'Оберіть Модель',
      ApiCallOption: DropdownElementData.model,
    },
    {
      iconUrl: 'google-location',
      info: 'Оберіть Область',
      ApiCallOption: DropdownElementData.location,
    },
    {
      iconUrl: 'speedometr',
      info: 'Оберіть тип двигуна',
      ApiCallOption: DropdownElementData.engine,
    },
    {
      iconUrl: 'transmission',
      info: 'Оберіть тип трансмісії',
      ApiCallOption: DropdownElementData.transmission,
    },
  ];

  // Range input related properties
  @Input() priceRange$!: Observable<PriceRange>;
  @ViewChild('sliderRangeElement') mySlider!: ElementRef;
  lowestPriceValue!: number;
  highestPriceValue!: number;
  ourValue!: number;

  searchParams!: SearchAdvancedParams;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    // Range input related manipulations
    this.priceRange$.subscribe((range: PriceRange) => {
      this.lowestPriceValue = range.lowest;
      this.highestPriceValue = range.highest;
      this.updateCssVariableRangeValue();
    });
  }

  updateCssVariableRangeValue(): void {
    if (this.highestPriceValue === undefined || !this.mySlider) {
      console.warn('Values are not initialized or slider is missing.');
      return;
    }
    const inputElement: HTMLInputElement = this.mySlider
      .nativeElement as HTMLInputElement;

    this.mySlider.nativeElement.style.setProperty(
      '--range-value',
      `${inputElement.value}%`
    );
    const inputStep: number =
      (this.highestPriceValue - this.lowestPriceValue) * 0.01;
    this.ourValue =
      inputStep * Number(inputElement.value) + this.lowestPriceValue;
    this.searchParams = {
      ...this.searchParams,
      lowestPrice: this.lowestPriceValue,
      highestPrice: this.ourValue,
    };
    this.cdRef.detectChanges();
  }

  @Output() getInfoForUlEvent = new EventEmitter<DropdownElementData>();
  @Input() InfoObjectDataOptionated?: {
    ApiCallOption: string;
    DropDownElementUlInfo: Array<{ id: string; name: string }>;
  };

  handleGetInfoForUlEvent(ApiCallOption: DropdownElementData) {
    this.getInfoForUlEvent.emit(ApiCallOption);
  }

  handleOptionPicked(
    option: { id: string; name: string },
    ApiCallOption: DropdownElementData
  ) {
    if (option.id === option.name) {
      this.searchParams.year = Number(option.name);
    } else {
      switch (ApiCallOption) {
        case DropdownElementData.engine:
          this.searchParams.engineTypeIds = option.id;
          break;
        case DropdownElementData.brand:
          this.searchParams.brand = option.name;
          this.searchParams.brandId = option.id;
          break;
        case DropdownElementData.model:
          this.searchParams.model = option.name;
          this.searchParams.modelId = option.id;
          break;
        case DropdownElementData.location:
          this.searchParams.locationRegion = option.name;
          this.searchParams.locationRegionId = option.id;
          break;
        case DropdownElementData.transmission:
          this.searchParams.transmissionTypeIds = option.id;
          break;
        default:
          console.log(typeof option);
          console.error('There is not such an ApiCallOption');
          break;
      }
    }
  }

  @Output() changeRouterLinkEvent = new EventEmitter<SearchAdvancedParams>();
  OnSearchButtonClick(): void {
    this.changeRouterLinkEvent.emit(this.searchParams);
  }
}

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { PriceRange } from '../../../models/PriceRange';
import { DropdownHeaderData } from '../../../models/DropdownHeaderData';
import { DropdownElementData } from '../../../models/DropdownElementData.enum';
import { SearchAdvancedParams } from '../../../models/SearchAdvancedParams';

@Component({
  selector: 'app-advanced-inputs-form',
  templateUrl: './advanced-inputs-form.component.html',
  styleUrl: './advanced-inputs-form.component.css',
})
export class AdvancedInputsFormComponent implements AfterViewInit {
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
    this.searchParams = {...this.searchParams, lowestPrice: this.lowestPriceValue, highestPrice:this.ourValue}
    this.cdRef.detectChanges();
  }

  @Output() getInfoForUlEvent = new EventEmitter<DropdownElementData>();
  @Input() InfoObjectDataOptionated?: {
    ApiCallOption: string;
    DropDownElementUlInfo: string[];
  };

  handleGetInfoForUlEvent(ApiCallOption: DropdownElementData) {
    this.getInfoForUlEvent.emit(ApiCallOption);
  }


  handleOptionPicked(option: string, ApiCallOption: DropdownElementData) {
    switch (ApiCallOption) {
      case DropdownElementData.engine:
        this.searchParams.engine = option;
        break;
      case DropdownElementData.brand:
        this.searchParams.brand = option;
        break;
      case DropdownElementData.model:
        this.searchParams.model = option;
        break;
      case DropdownElementData.location:
        this.searchParams.region = option;
        break;
      case DropdownElementData.transmission:
        this.searchParams.transmission = option;
        break;
      case DropdownElementData.year:
        this.searchParams.year = Number(option);
        break;
      default:
        console.error('There is not such an ApiCallOption')
        break;
    }
  }

  @Output() changeRouterLinkEvent = new EventEmitter<SearchAdvancedParams>();
  OnSearchButtonClick(): void {
    this.changeRouterLinkEvent.emit(this.searchParams);
  }
}

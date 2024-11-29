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
      ApiCallOption: DropdownElementData.engine,
    },
    {
      iconUrl: 'car-2000',
      info: 'Оберіть Бренд',
      ApiCallOption: DropdownElementData.engine,
    },
    {
      iconUrl: 'car-change',
      info: 'Оберіть Модель',
      ApiCallOption: DropdownElementData.engine,
    },
    {
      iconUrl: 'google-location',
      info: 'Оберіть Область',
      ApiCallOption: DropdownElementData.engine,
    },
    {
      iconUrl: 'speedometr',
      info: 'Оберіть тип двигуна',
      ApiCallOption: DropdownElementData.engine,
    },
    {
      iconUrl: 'transmission',
      info: 'Оберіть тип трансмісії',
      ApiCallOption: DropdownElementData.engine,
    },
  ];

  // Range input related properties
  @Input() priceRange$!: Observable<PriceRange>;
  @ViewChild('sliderRangeElement') mySlider!: ElementRef;
  lowestPriceValue!: number;
  highestPriceValue!: number;
  ourValue!: number;

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
    this.cdRef.detectChanges();
  }

  @Output() getInfoForUlEvent = new EventEmitter<DropdownElementData>();
  @Input() DropDownElementUlInfo?: string[];

  handleGetInfoForUlEvent(ApiCallOption: DropdownElementData) {
    this.getInfoForUlEvent.emit(ApiCallOption);
  }
}

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
import { EngineType } from '../../../../../shared/models/ApiModels/EngineType';

@Component({
  selector: 'app-advanced-inputs-form',
  templateUrl: './advanced-inputs-form.component.html',
  styleUrl: './advanced-inputs-form.component.css',
})
export class AdvancedInputsFormComponent implements AfterViewInit {
  gridDivArraysInfo: { iconUrl: string; info: string }[] = [
    { iconUrl: 'calendar', info: 'Оберіть Рік' },
    { iconUrl: 'car-2000', info: 'Оберіть Бренд' },
    { iconUrl: 'car-change', info: 'Оберіть Модель' },
    { iconUrl: 'google-location', info: 'Оберіть Область' },
    { iconUrl: 'speedometr', info: 'Оберіть тип двигуна' },
    { iconUrl: 'transmission', info: 'Оберіть тип трансмісії' },
  ];

  // Range input related properties
  @Input() priceRange$!: Observable<{ lowest: number; highest: number }>;
  @ViewChild('sliderRangeElement') mySlider!: ElementRef;
  lowestPriceValue!: number;
  highestPriceValue!: number;
  ourValue!: number;

  ngAfterViewInit(): void {
    // Range input related manipulations
    this.priceRange$.subscribe((range: { lowest: number; highest: number }) => {
      this.lowestPriceValue = range.lowest;
      this.highestPriceValue = range.highest;
      // this.ourValue =
      // (((range.highest - range.lowest) * 0.3 + range.lowest) /
      //   range.highest) *
      // 100;
      this.updateCssVariableRangeValue();
    });
  }

  constructor(private cdRef: ChangeDetectorRef) {}

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

  @Output() getInfoForUlEvent = new EventEmitter<string>();
  @Input() DropDownElementUlInfo?: EngineType[];

  handleGetInfoForUlEvent(data: string) {
    this.getInfoForUlEvent.emit(data);
  }
}

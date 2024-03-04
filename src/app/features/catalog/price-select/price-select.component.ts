import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-price-select',
  templateUrl: './price-select.component.html',
  styleUrls: ['./price-select.component.css'],
})
export class PriceSelectComponent implements AfterViewInit, OnChanges {

  @Input() lowerPriceLimit?: number;
  @Input() upperPriceLimit?: number;

  @Output() selectedNewLowerPrice: EventEmitter<number | null> =
    new EventEmitter<number | null>();
  @Output() selectedNewUpperPrice: EventEmitter<number | null> =
    new EventEmitter<number | null>();

  minGap: number = 7500;
  sliderMinValue: number = 0;
  sliderMaxValue: number = 0;

  @ViewChild('min_val') minVal!: ElementRef;
  @ViewChild('max_val') maxVal!: ElementRef;
  @ViewChild('price_input_min') priceInputMin!: ElementRef;
  @ViewChild('price_input_max') priceInputMax!: ElementRef;

  @ViewChild('slider_track') sliderRange!: ElementRef;
  sliderRangeElement: any;

  ngAfterViewInit(): void {
    if (this.lowerPriceLimit !== null && this.upperPriceLimit !== null) {
      this.sliderMinValue = this.lowerPriceLimit!;
      this.sliderMaxValue = this.upperPriceLimit!;
      this.sliderRangeElement = this.sliderRange.nativeElement;
      this.setArea();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if('lowerPriceLimit' || 'upperPriceLimit' in changes)
    {
      if(this.sliderRangeElement)
      {
        this.setArea();
        this.priceInputMin.nativeElement.value = this.lowerPriceLimit;
        this.priceInputMax.nativeElement.value = this.upperPriceLimit;
      }
        
      
    }
  }

  changePriceLowerLimit(newLowerPrice: Event) {
    if (newLowerPrice.target instanceof HTMLInputElement) {
      this.selectedNewLowerPrice.emit(parseInt(newLowerPrice.target.value));
      this.setArea();
    }
  }

  changePriceUpperLimit(newUpperPrice: Event) {
    if (newUpperPrice.target instanceof HTMLInputElement) {
      this.selectedNewUpperPrice.emit(parseInt(newUpperPrice.target.value));
      this.setArea();
    }
  }

  slideMin() {
    let gap =
      parseInt(this.maxVal.nativeElement.value) -
      parseInt(this.minVal.nativeElement.value);

    if (gap <= this.minGap) {
      this.minVal.nativeElement.value =
        parseInt(this.maxVal.nativeElement.value) - this.minGap;
    }
    this.priceInputMin.nativeElement.value = parseInt(
      this.minVal.nativeElement.value
    );
    this.lowerPriceLimit = this.priceInputMin.nativeElement.value;
    this.setArea();
    this.selectedNewLowerPrice.emit(this.priceInputMin.nativeElement.value);
  }

  slideMax() {
    let gap =
      parseInt(this.maxVal.nativeElement.value) -
      parseInt(this.minVal.nativeElement.value);

    if (gap <= this.minGap) {
      this.maxVal.nativeElement.value =
        parseInt(this.minVal.nativeElement.value) + this.minGap;
    }
    this.priceInputMax.nativeElement.value = parseInt(
      this.maxVal.nativeElement.value
    );
    this.upperPriceLimit = this.priceInputMax.nativeElement.value;
    this.selectedNewUpperPrice.emit(this.priceInputMax.nativeElement.value);
    this.setArea();
  }

  setArea() {
    this.sliderRangeElement.style.left =
      ((this.lowerPriceLimit! / this.sliderMaxValue) * 100).toString() + '%';
    this.sliderRangeElement.style.right =
      (100 - (this.upperPriceLimit! / this.sliderMaxValue) * 100).toString() +
      '%';
  }
}

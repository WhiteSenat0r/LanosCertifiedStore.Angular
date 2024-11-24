import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-advanced-inputs-form',
  templateUrl: './advanced-inputs-form.component.html',
  styleUrl: './advanced-inputs-form.component.css',
})
export class AdvancedInputsFormComponent implements AfterViewInit {
  @ViewChild('sliderRangeElement') mySlider!: ElementRef;

  lowerPriceValue: number = 0;
  upperPriceValue: number = 10000;

  ngAfterViewInit(): void {
    this.updateCssVariableRangeValue();
  }

  updateCssVariableRangeValue(): void {
    const inputElement: HTMLInputElement = this.mySlider.nativeElement as HTMLInputElement;

    this.mySlider.nativeElement.style.setProperty('--range-value', `${inputElement.value}%`);
    this.upperPriceValue = Number(inputElement.value) * 1000;
  }
}

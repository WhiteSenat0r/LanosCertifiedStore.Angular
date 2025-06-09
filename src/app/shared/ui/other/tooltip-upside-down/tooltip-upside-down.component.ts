import { Component, ElementRef, input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tooltip-upside-down',
  standalone: true,
  templateUrl: './tooltip-upside-down.component.html',
})
export class TooltipUpsideDownComponent {
  @ViewChild('toolTipWrapper') toolTipWrapper!: ElementRef;

  message = input.required<string>()

  ngAfterViewInit() {
    const toolTipWrapperHeight = this.toolTipWrapper.nativeElement.offsetHeight;
    this.toolTipWrapper.nativeElement.style.bottom = `-${toolTipWrapperHeight + 6}px`;
  }
}

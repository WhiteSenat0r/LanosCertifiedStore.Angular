import { AfterViewInit, Component, ElementRef, input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  templateUrl: './tooltip.component.html',
})
export class TooltipComponent implements AfterViewInit {
  @ViewChild('toolTipWrapper') toolTipWrapper!: ElementRef;

  message = input.required<string>()

  ngAfterViewInit() {
    const toolTipWrapperHeight = this.toolTipWrapper.nativeElement.offsetHeight;
    this.toolTipWrapper.nativeElement.style.top = `-${toolTipWrapperHeight + 6}px`;
    console.log(toolTipWrapperHeight);
  }
}

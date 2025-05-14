import { Directive, ElementRef, HostListener, inject, input, InputSignal } from '@angular/core';

@Directive({
  selector: '[appImageError]',
  standalone: true
})
export class ImageErrorDirective {
  appImageError: InputSignal<string> = input.required<string>();
  private el = inject(ElementRef<HTMLImageElement>);

  @HostListener('error')
  onError(): void
  {
    this.el.nativeElement.src = this.appImageError();
  }
}

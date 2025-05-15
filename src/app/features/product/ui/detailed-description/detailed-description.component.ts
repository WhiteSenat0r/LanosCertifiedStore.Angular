import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  signal,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-detailed-description',
  templateUrl: './detailed-description.component.html',
  styleUrl: './detailed-description.component.css',
})
export class DetailedDescriptionComponent implements AfterViewInit {
  @ViewChild('textWrapper') textWrapper!: ElementRef;
  description = input<string>();
  show = signal<boolean>(false);

  ngAfterViewInit(): void {
    const el = this.textWrapper.nativeElement;
    const overflow = el.scrollHeight === el.offsetHeight;
    this.show.set(overflow);
  }

  showMore() {
    this.show.set(true);
  }
}

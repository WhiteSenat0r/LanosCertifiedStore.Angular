import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-icon-bookmark-main',
  standalone: true,
  imports: [],
  templateUrl: './icon-bookmark-main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconBookmarkMainComponent {
  innerClass = input<string>();
}

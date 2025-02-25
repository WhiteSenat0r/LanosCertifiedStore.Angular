import {
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  EffectRef,
  inject,
  input,
  InputSignal,
} from '@angular/core';
import { VehicleColor } from '../../../../shared/models/BaseApiModels/VehicleColor';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
})
export class ColorPaletteComponent {
  cdr = inject(ChangeDetectorRef);
  colors: InputSignal<VehicleColor[]> = input<VehicleColor[]>([]);

  ref: EffectRef = effect(() => {
    console.log(this.colors());
    this.cdr.detectChanges();
  });

  handleButtonClick() {
    console.log('yes');
  }
}

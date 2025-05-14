import {
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  EffectRef,
  inject,
  input,
  InputSignal,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { VehicleColor } from '../../../../shared/models/interfaces/vehicle-properties/VehicleColor.interface';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
})
export class ColorPaletteComponent {
  colors: InputSignal<VehicleColor[]> = input<VehicleColor[]>([]);
  chosenColor= input.required<VehicleColor | undefined>();
  onColorChange = output<VehicleColor>();
  handleColorPick(color: VehicleColor) {
    this.onColorChange.emit(color);
  }
}

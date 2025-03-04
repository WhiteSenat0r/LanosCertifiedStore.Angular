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
  chosenColor: WritableSignal<VehicleColor | undefined> = signal(undefined);
  onColorChange = output<VehicleColor>();
  handleColorPick(color: VehicleColor) {
    this.chosenColor.set(color);
    this.onColorChange.emit(color);
  }
}

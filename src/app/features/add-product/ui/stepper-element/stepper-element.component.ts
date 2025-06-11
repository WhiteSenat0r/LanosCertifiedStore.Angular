import { Component, computed, input, signal } from '@angular/core';
import { AddProductStages } from '../../models/enums/AddProductStages.enum';

type StepStatus = 'completed' | 'active' | 'pending';

interface StepMeta {
  icon: 'car' | 'cog' | 'doc' | 'camera';
  lines: string[];
}

@Component({
  selector: 'app-stepper-element',
  templateUrl: './stepper-element.component.html',
})
export class StepperElementComponent {
  AddProductStages = AddProductStages;

  formStage = input.required<AddProductStages>();

  readonly steps: StepMeta[] = [
    { icon: 'car', lines: ['Основна', 'Інформація'] },
    { icon: 'cog', lines: ['Технічні', 'Характеристики'] },
    { icon: 'doc', lines: ['Додаткова', 'Інформація'] },
    { icon: 'camera', lines: ['Фотографії']},
  ];

  getStepStatus(index: number): StepStatus {
    if (index < this.formStage()) {
      return 'completed';
    } else if (index === this.formStage()) {
      return 'active';
    } else {
      return 'pending';
    }
  }

  getProgressWidth(index: number): number {
    if (index < this.formStage()) return 100;
    if (index === this.formStage()) return 0;
    return 0;
  }
}

import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-type-exhibit-section',
  templateUrl: './type-exhibit-section.component.html',
  styleUrl: './type-exhibit-section.component.css'
})
export class TypeExhibitSectionComponent {
  @Input() vehicles!: any;
  items: string[] = [
    'Усі',
    'Новий',
    'Старий',
    'Зношений',
    'Тупий',
    'Святий',
    'Ніякий',
  ];
  selectedItemIndex: number = 0;

  selectItem(index: number) {
    this.selectedItemIndex = index;
  }
  isSelected(index: number): boolean {
    return this.selectedItemIndex === index;
  }
}

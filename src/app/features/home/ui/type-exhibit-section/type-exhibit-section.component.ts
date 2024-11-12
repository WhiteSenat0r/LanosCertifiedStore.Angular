import {Component, Input } from '@angular/core';

@Component({
  selector: 'app-type-exhibit-section',
  templateUrl: './type-exhibit-section.component.html',
  styleUrl: './type-exhibit-section.component.css'
})
export class TypeExhibitSectionComponent {
  @Input() vehicles!: any;

  selectedItemIndex: number = 0;
  
  items: string[] = [
    'Усі',
    'Новий',
    'Старий',
    'Зношений',
    'Тупий',
    'Святий',
    'Ніякий',
  ];

}

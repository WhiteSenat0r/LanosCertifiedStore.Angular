import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top-propositions-section',
  templateUrl: './top-propositions-section.component.html',
  styleUrl: './top-propositions-section.component.css'
})
export class TopPropositionsSectionComponent {
  @Input() vehicles!: any;

  selectedItemIndex: number = 0;
}

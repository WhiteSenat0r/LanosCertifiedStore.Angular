import { Component, Input } from '@angular/core';
import { Vehicle } from '../../../../shared/models/ApiModels/Vehicle';

@Component({
  selector: 'app-top-propositions-section',
  templateUrl: './top-propositions-section.component.html',
  styleUrl: './top-propositions-section.component.css'
})
export class TopPropositionsSectionComponent {
  @Input() vehicles!: Vehicle[];
}

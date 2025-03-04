import { Component, Input } from '@angular/core';
import { Vehicle } from '../../../../shared/models/interfaces/vehicle-properties/Vehicle.interface';

@Component({
  selector: 'app-top-propositions-section',
  templateUrl: './top-propositions-section.component.html',
  styleUrl: './top-propositions-section.component.css',
})
export class TopPropositionsSectionComponent {
  @Input() vehicles!: Vehicle[];
}

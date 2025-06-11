import { Component, Input } from '@angular/core';

interface Vehicle {
  id: string;
  mileage: number;
  displacement: number;
  price: number;
  mainImageUrl: string;
  fullName: string;
  locationTownName: string;
  engineType: string;
  bodyType: string;
  isPresentInWishlist: boolean;
}

@Component({
  selector: 'app-carcard',
  templateUrl: './carcard.component.html',
  styleUrl: './carcard.component.css'
})
export class CarcardComponent {
 @Input() vehicle: any;
}

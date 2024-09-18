import { Component } from '@angular/core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  meals = Array(50).fill(null).map((_, i) => `Meal ${i + 1}`);
}

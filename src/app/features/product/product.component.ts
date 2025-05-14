import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './services/product.service';
import { ExtendedVehicle } from '../../shared/models/classes/vehicle-properties/ExtendedVehicle.class';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);

  vehicle = signal<ExtendedVehicle>(new ExtendedVehicle());

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.productService.getVehicle(productId).subscribe((vehicle) => {
          this.vehicle.set(vehicle);
        });
      }
    });
  }
}

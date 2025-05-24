import {
  Component,
  inject,
  model,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './services/product.service';
import { ExtendedVehicle } from '../../shared/models/classes/vehicle-properties/ExtendedVehicle.class';
import { Vehicle } from '../../shared/models/interfaces/vehicle-properties/Vehicle.interface';
import { PaginatedResult } from '../../shared/models/interfaces/api/PaginatedResult.interface';
import { Model } from '../../shared/models/interfaces/vehicle-properties/Model.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);

  vehicle = signal<ExtendedVehicle>(new ExtendedVehicle());
  similarVehicles = signal<Vehicle[]>([]);
  models = signal<Model[]>([]);

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.productService
          .getVehicle(productId)
          .subscribe((vehicle: ExtendedVehicle) => {
            this.vehicle.set(vehicle);
            this.productService
              .getVehicles(this.vehicle().transmissionType)
              .subscribe((response: PaginatedResult<Vehicle>) => {
                this.similarVehicles.set(response.items);
              });
            this.productService
              .getModels(this.vehicle().brand)
              .subscribe((response) => {
                this.models.set(
                  response.items.filter((model) => model.name !== vehicle.model)
                );
              });
          });
      }
    });
  }

  handleGoToVehiclePage(id: string) {
    this.router.navigate(['/catalog', id]);
  }

  handleModelClicked(model: Model) {
    const brandName = model.vehicleBrand;
    this.router.navigate(['/catalog'], {
      queryParams: { brandName: brandName, modelId: model.id },
    });
  }

  handleBrandClicked(brandName: string) {
    this.router.navigate(['/catalog'], {
      queryParams: { brandName: brandName },
    });
  }
}

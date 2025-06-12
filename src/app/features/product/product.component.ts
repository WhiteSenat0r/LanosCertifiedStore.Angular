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
import { WishlistOperationsService } from '../../shared/services/wishlist-operations.service';
import { iif, switchMap } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  private readonly wishlistOperationsService = inject(
    WishlistOperationsService
  );

  vehicle = signal<ExtendedVehicle>(new ExtendedVehicle());
  similarVehicles = signal<Vehicle[]>([]);
  models = signal<Model[]>([]);

  productId = signal<string | undefined>(undefined);

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.productId.set(productId);
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
  //Methods
  handleGoToVehiclePage(id: string) {
    this.router.navigate(['/catalog', id]);
  }

  handleModelClicked(model: Model) {
    const brandName = model.vehicleBrand;
    this.router.navigate(['/catalog'], {
      queryParams: { brand: brandName, modelId: model.id },
    });
  }
  handleBrandClicked(brandName: string) {
    this.router.navigate(['/catalog'], {
      queryParams: { brand: brandName },
    });
  }
  handleBookmarkButtonClick() {
    const productId = this.productId();
    const vehicle = this.vehicle();

    if (!productId) {
      console.error('Vehicle id is undefined!');
      return;
    }

    const operation$ = iif(
      () => !vehicle.isPresentInWishlist,
      this.wishlistOperationsService.addVehicleToWishList(productId),
      this.wishlistOperationsService.deleteVehicleFromWishList(productId)
    );

    operation$
      .pipe(switchMap(() => this.productService.getVehicle(productId)))
      .subscribe({
        next: (updatedVehicle: ExtendedVehicle) => {
          this.vehicle.update((currentVehicle) => {
            currentVehicle.isPresentInWishlist = updatedVehicle.isPresentInWishlist
            return currentVehicle
          });
        },
        error: (err) => {
          console.error(
            'Error while updating wishlist or fetching vehicle:',
            err
          );
        },
      });
  }
}

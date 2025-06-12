import {
  Component,
  effect,
  inject,
  input,
  Input,
  output,
  Output,
} from '@angular/core';
import { Vehicle } from '../../../../shared/models/interfaces/vehicle-properties/Vehicle.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewMode } from '../../models/enums/ViewMode.enum';
import { WishlistOperationsService } from '../../../../shared/services/wishlist-operations.service';
import { iif, switchMap } from 'rxjs';
import { ExtendedVehicle } from '../../../../shared/models/classes/vehicle-properties/ExtendedVehicle.class';

@Component({
  selector: 'app-vehicle-data-view',
  templateUrl: './vehicle-data-view.component.html',
  styleUrl: './vehicle-data-view.component.css',
})
export class VehicleDataViewComponent {
  private readonly wishlistOperationsService = inject(
    WishlistOperationsService
  );

  readonly spinner = inject(NgxSpinnerService);

  @Input({ required: true }) vehicles!: Vehicle[] | undefined;
  isLoading = input.required<boolean>();
  viewMode = input.required<ViewMode>();
  currentCurrencyHolder = input.required<{ type: string; rates: number[] }>();
  spinnerEffect = effect(() => {
    if (this.isLoading()) {
      this.spinner.show('catalogSpinner');
    } else {
      this.spinner.hide('catalogSpinner');
    }
  });
  goToProductPage = output<Vehicle>();

  handleCardClick(vehicle: Vehicle) {
    this.goToProductPage.emit(vehicle);
  }

  handleBookmarkButtonClick(productId: string) {
    if (!productId) {
      console.error('Vehicle id is undefined!');
      return;
    }

    const vehicle = this.vehicles?.find((v) => v.id === productId);
    if (!vehicle) {
      console.error('Vehicle is undefined!');
      return;
    }

    const operation$ = iif(
      () => !vehicle.isPresentInWishlist,
      this.wishlistOperationsService.addVehicleToWishList(productId),
      this.wishlistOperationsService.deleteVehicleFromWishList(productId)
    );

    operation$.subscribe({
      next: () => {
        // Оновлюємо локальний стан
        vehicle.isPresentInWishlist = !vehicle.isPresentInWishlist;
      },
      error: (err) => {
        console.error('Error while updating wishlist:', err);
      },
    });
  }
}

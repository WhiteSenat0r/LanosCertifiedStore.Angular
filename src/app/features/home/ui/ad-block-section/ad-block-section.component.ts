import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ad-block-section',
  templateUrl: './ad-block-section.component.html',
  styleUrl: './ad-block-section.component.css',
})
export class AdBlockSectionComponent {
  readonly router = inject(Router);
  readonly auth = inject(AuthService);
  readonly toastr = inject(ToastrService);
  handleAddNewProductClick() {
    this.router.navigateByUrl('/profile/add-product');
    // if (this.auth.userProfileSignal()) {
    //   this.router.navigateByUrl('/profile/add-product');
    // } else {
    //   this.toastr.warning(
    //     'Щоб додати нове авто, треба бути авторизованим',
    //     'Попередження'
    //   );
    // }
  }
}

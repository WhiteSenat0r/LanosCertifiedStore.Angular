import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Brand } from 'src/app/shared/models/brand';

@Component({
  selector: 'app-brandtabletabs',
  templateUrl: './brandtabletabs.component.html',
  styleUrls: ['./brandtabletabs.component.css']
})
export class BrandtabletabsComponent {

  brands: Brand[] = [];

  currentPage: number = 1;
  pageSize: number = 8;

  constructor(private dashboardService: DashboardService,) {

  }

  ngOnInit(): void {
    this.getBrand();
  }

  getBrand() {
    this.dashboardService.getBrands().subscribe({
      next: response => this.brands = response,
      error: error => console.error(error),
      complete: () => console.log("GetData Types"),
    })
  }

  addBrand(newBrandName: string) {
    this.dashboardService.addBrand(newBrandName).subscribe({
      next: response => {
        console.log('Brand added successfully:', response);
        this.getBrand();
      },
      error: error => console.error('Error adding brand:', error)
    });
  }

  deleteBrand(brandId: string) {
    this.dashboardService.deleteBrand(brandId).subscribe({
      next: response => {
        console.log('Brand deleted successfully:', response);
        this.getBrand();
      },
      error: error => console.error('Error deleting brand:', error)
    });
  }

  get totalPages(): number {
    return Math.ceil(this.brands.length / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }
}

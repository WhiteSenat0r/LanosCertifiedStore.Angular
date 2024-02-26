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
  pageNumber: number = 1;

  currentBrandId: string ="";

  constructor(private dashboardService: DashboardService,) {

  }

  ngOnInit(): void {
    this.getBrand();
  }

  get pageGeneration() {
    const brandcontainer = [];
    let temp = [];
    const pageSize = 8;

    for (let i = 0; i < this.brands.length; i++) {
      temp.push(this.brands[i]);

      if ((i + 1) % pageSize === 0 || i === this.brands.length - 1) {
        brandcontainer.push(temp);
        temp = [];
      }
    }
    return brandcontainer;
  }

  handlePageChange(page: number) {
    if (this.pageNumber !== page) {
      this.pageNumber = page
    }
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

  setEditedBrand(itemId: string) {
    this.currentBrandId = itemId;
  }

  updateBrand(newName: string) {
    if (!newName.trim()) {
      console.error('Updated name cannot be empty');
      return;
    }

    console.log('Updating type with id:', this.currentBrandId);
    console.log('New name:', newName);

    this.dashboardService.updateBrand(this.currentBrandId, newName).subscribe({
      next: response => {
        console.log('Type updated successfully:', response);
        this.getBrand();
      },
      error: error => {
        console.error('Error updating type:', error);
      }
    });
  }
}

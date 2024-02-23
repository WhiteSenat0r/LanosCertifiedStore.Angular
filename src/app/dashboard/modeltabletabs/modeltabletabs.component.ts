import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/shared/models/model';
import { Brand } from 'src/app/shared/models/brand';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-modeltabletabs',
  templateUrl: './modeltabletabs.component.html',
  styleUrls: ['./modeltabletabs.component.css']
})
export class ModeltabletabsComponent implements OnInit {

  models: Model[] = [];
  brands: Brand[] = [];
  selectedBrandId: string = ''; 

  currentPage: number = 1;
  pageSize: number = 8;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getModel();
    this.getBrands();
  }

  getModel() {
    this.dashboardService.getModel().subscribe({
      next: response => {
        this.models = response;
      },
      error: error => console.error(error),
      complete: () => console.log("Got Models Data"),
    })
  }

  getBrands() {
    this.dashboardService.getBrands().subscribe({
      next: response => {
        this.brands = response;
      },
      error: error => console.error(error),
      complete: () => console.log("Got Brands Data"),
    })
  }

  addModel(newModelName: string, brandId: string) {
    if (!brandId || !newModelName) {
        console.error('Brand and model name must be selected.');
        return;
    }

    this.dashboardService.addModel(newModelName, brandId).subscribe({
        next: response => {
            console.log('Model successfully added:', response);
            this.getModel();
        },
        error: error => console.error('Error adding model:', error)
    });
}

  deleteModel(modelId: string) {
    this.dashboardService.deleteModel(modelId).subscribe({
      next: response => {
        console.log('Model deleted successfully:', response);
        this.getModel(); 
      },
      error: error => console.error('Error deleting model:', error)
    });
  }

  updateSelectedBrand(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedBrandId = target.value;
}

  get totalPages(): number {
    return Math.ceil(this.models.length / this.pageSize);
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

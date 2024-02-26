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
  pageNumber: number = 1;

  currentModelId: string = "";

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getModel();
    this.getBrands();
  }

  get pageGeneration() {
    const modelcontainer = [];
    let temp = [];
    const pageSize = 8;

    for (let i = 0; i < this.models.length; i++) {
      temp.push(this.models[i]);

      if ((i + 1) % pageSize === 0 || i === this.models.length - 1) {
        modelcontainer.push(temp);
        temp = [];
      }
    }
    return modelcontainer;
  }

  handlePageChange(page: number) {
    if (this.pageNumber !== page) {
      this.pageNumber = page
    }
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
    console.log(newModelName);
    console.log(brandId);

    if (!brandId) {
      console.error('Brand must be selected.');
      return;
    }
    if (!newModelName) {
      console.error('Model name must be selected.');
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

  setEditedModel(itemId: string) {
    this.currentModelId = itemId;
  }

  UpdateModel(newName: string) {
    if (!newName.trim()) {
      console.error('Updated name cannot be empty');
      return;
    }

    console.log('Updating model with id:', this.currentModelId);
    console.log('New name:', newName);

    this.dashboardService.updateModel(this.currentModelId, newName).subscribe({
      next: response => {
        console.log('model updated successfully:', response);
        this.getModel();
      },
      error: error => {
        console.error('Error updating model:', error);
      }
    });

  }
}

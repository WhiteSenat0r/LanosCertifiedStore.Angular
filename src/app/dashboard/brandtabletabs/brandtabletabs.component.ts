import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Brand } from 'src/app/shared/models/brand';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brandtabletabs',
  templateUrl: './brandtabletabs.component.html',
  styleUrls: ['./brandtabletabs.component.css']
})
export class BrandtabletabsComponent implements OnInit {

  brands: Brand[] = [];

  currentPage: number = 1;
  pageSize: number = 8;
  pageNumber: number = 1;

  currentBrandId: string ="";

  showAlert: boolean = false;

  newBrandForm: FormGroup;
  editedBrandForm: FormGroup;

  constructor(private dashboardService: DashboardService, private toastr: ToastrService) {
    this.newBrandForm = new FormGroup({
      newBrandName: new FormControl('', Validators.required)
    });

    this.editedBrandForm = new FormGroup({
      editedBrandName: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getBrands();
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

  getBrands() {
    this.dashboardService.getBrands().subscribe({
      next: response => this.brands = response,
      error: error => console.error(error),
      complete: () => console.log("GetData Brands"),
    })
  }

  addBrand() {
    if (this.newBrandForm.valid) {
      const newBrandName = this.newBrandForm.value.newBrandName;
      this.dashboardService.addBrand(newBrandName).subscribe({
        next: response => {
          console.log('Brand added successfully:', response);
          this.getBrands();
         this.showAlert = true;
          this.newBrandForm.reset();
          setTimeout(() => {
            this.showAlert = false;
            
          }, 3000);
        },
        error: error => { this.toastr.error("Такий бренд уже існує") }
      });
    }
  }

setEditedBrand(itemId: string) {
    this.currentBrandId = itemId;
    const brandToEdit = this.brands.find(item => item.id === itemId);
    if (brandToEdit) {
      this.editedBrandForm.patchValue({
        editedBrandName: brandToEdit.name
      });
    }
  }

  deleteBrand() {
    this.dashboardService.deleteBrand(this.currentBrandId).subscribe({
      next: response => {
        console.log('Brand deleted successfully:', response);
        this.getBrands();
      },
      error: error => console.error('Error deleting brand:', error)
    });
  }

  
  updateBrand() {
    if (this.editedBrandForm.valid) {
      const newName = this.editedBrandForm.value.editedBrandName;

      console.log('Updating brand with id:', this.currentBrandId);
      console.log('New name:', newName);

      this.dashboardService.updateBrand(this.currentBrandId, newName).subscribe({
        next: response => {
          console.log('Brand updated successfully:', response);
          this.getBrands();
        },
        error: error => { this.toastr.error("Такий бренд уже існує") }
      });
    }
  }
}

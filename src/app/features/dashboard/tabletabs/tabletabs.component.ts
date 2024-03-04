import { Component, OnInit } from '@angular/core';
import { Type } from '../../../shared/models/type';
import { DashboardService } from '../dashboard.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tabletabs',
  templateUrl: './tabletabs.component.html',
  styleUrls: ['./tabletabs.component.css']
})
export class TabletabsComponent implements OnInit {

  types: Type[] = [];

  currentPage: number = 1;
  pageSize: number = 8;
  pageNumber: number = 1;

  currentTypeId: string = "";

  showAlert: boolean = false;

  newTypeForm: FormGroup;
  editedTypeForm: FormGroup;

  constructor(private dashboardService: DashboardService, private toastr: ToastrService) {
    this.newTypeForm = new FormGroup({
      newTypeName: new FormControl('', Validators.required)
    });

    this.editedTypeForm = new FormGroup({
      editedTypeName: new FormControl('', Validators.required)
    });
  }


  ngOnInit(): void {
    this.getTypes();
  }

  get pageGeneration() {
    const typecontainer = [];
    let temp = [];
    const pageSize = 8;

    for (let i = 0; i < this.types.length; i++) {
      temp.push(this.types[i]);

      if ((i + 1) % pageSize === 0 || i === this.types.length - 1) {
        typecontainer.push(temp);
        temp = [];
      }
    }
    return typecontainer;
  }

  handlePageChange(page: number) {
    if (this.pageNumber !== page) {
      this.pageNumber = page
    }
  }

  getTypes() {
    this.dashboardService.getTypes().subscribe({
      next: response => this.types = response,
      error: error => {
        console.error(error);
        this.toastr.error('Помилка завантаження типів');
      }
    })
  }

  addType() {
    if (this.newTypeForm.valid) {
      const newTypeName = this.newTypeForm.value.newTypeName;
      this.dashboardService.addType(newTypeName).subscribe({
        next: response => {
          console.log('Type added successfully:', response);
          this.getTypes();
          this.showAlert = true;
          this.newTypeForm.reset();
          setTimeout(() => {
            this.showAlert = false;

          }, 3000);
        },
        error: error => {
          this.newTypeForm.reset();
          console.error(error);
          this.toastr.error('Помилка додавання типу');
        }
      });
    }
  }
  setEditedType(itemId: string) {
    this.currentTypeId = itemId;
    const typeToEdit = this.types.find(item => item.id === itemId);
    if (typeToEdit) {
      this.editedTypeForm.patchValue({
        editedTypeName: typeToEdit.name
      });
    }
  }

  deleteType() {
    this.dashboardService.deleteType(this.currentTypeId).subscribe({
      next: response => {
        console.log('Type deleted successfully:', response);
        this.toastr.success('Тип успішно видалений');
        this.getTypes();
      },
      error: error => {
        console.error('Error deleting type:', error);
        this.toastr.success('Помилка видалення тип');
      }
    });
  }

  updateType() {
    if (this.editedTypeForm.valid) {
      const newName = this.editedTypeForm.value.editedTypeName;

      console.log('Updating type with id:', this.currentTypeId);
      console.log('New name:', newName);

      this.dashboardService.updateType(this.currentTypeId, newName).subscribe({
        next: response => {
          console.log('Type updated successfully:', response);
          this.editedTypeForm.reset();
          this.getTypes();
        },
        error: error => {
          console.error(error);
          this.editedTypeForm.reset();
          this.toastr.error("Такий тип уже існує")
        }
      });
    }
  }
}

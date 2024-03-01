import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Color } from 'src/app/shared/models/color';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-colortabletabs',
  templateUrl: './colortabletabs.component.html',
  styleUrls: ['./colortabletabs.component.css']
})
export class ColortabletabsComponent implements OnInit {

  colors: Color[] = [];

  colorForm: FormGroup;
  editColorForm: FormGroup;

  currentColorId: string = "";
  currentPage: number = 1;
  pageSize: number = 8;

  pageNumber: number = 1;

  showAlert: boolean = false;

  constructor(private dashboardService: DashboardService, private toastr: ToastrService) {
    this.colorForm = new FormBuilder().group({
      newColorName: ['', Validators.required],
      newHexValue: ['', Validators.required]
    });
    this.editColorForm = new FormBuilder().group({
      editColorName: ['', Validators.required],
      editHexValue: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getColors();
  }

  get pageGeneration() {
    const colorcontainer = [];
    let temp = [];
    const pageSize = 8;

    for (let i = 0; i < this.colors.length; i++) {
      temp.push(this.colors[i]);

      if ((i + 1) % pageSize === 0 || i === this.colors.length - 1) {
        colorcontainer.push(temp);
        temp = [];
      }
    }
    return colorcontainer;
  }

  handlePageChange(page: number) {
    if (this.pageNumber !== page) {
      this.pageNumber = page
    }
  }

  getColors() {
    this.dashboardService.getColor().subscribe({
      next: response => this.colors = response,
      error: error => console.error(error),
      complete: () => console.log("GetData Colors"),
    })
  }

  addColor(newColorName: string, newHexValue: string) {
    this.dashboardService.addColor(newColorName, newHexValue).subscribe({
      next: response => {
        console.log('Color added successfully:', response);
        this.getColors();
        this.showAlert = true;
        this.colorForm.reset();
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      },
      error: error => {
        console.error('Error adding color:', error);
        this.toastr.error("Такий колір уже існує");
      }
    });
  }

  setEditedColor(itemId: string) {
    this.currentColorId = itemId;
    const colorToEdit = this.colors.find(item => item.id === itemId);
    if (colorToEdit) {
      this.editColorForm.patchValue({
        editColorName: colorToEdit.name,
        editHexValue: colorToEdit.hexValue
      });
    }
  }

  deleteColor() {
    this.dashboardService.deleteColor(this.currentColorId).subscribe({
      next: response => {
        this.toastr.success('Колір успішно видалений');
        console.log('Color deleted successfully:', response);
        this.getColors();
      },
      error: error => console.error('Error deleting color:', error)
    });
  }

  UpdateColor() {
    if (this.editColorForm.valid) {
      const newName = this.editColorForm.value.editColorName;
      const newHex = this.editColorForm.value.editHexValue;

      this.dashboardService.updateColor(this.currentColorId, newName, newHex).subscribe({
        next: response => {
          this.editColorForm.reset();
          this.toastr.success('Колір успішно оновлений!');
          console.log('Color updated successfully:', response);
          this.getColors();
        },
        error: error => {
          this.editColorForm.reset();
          console.error('Error updating color:', error);
          this.toastr.error("Такий колір уже існує");
        }
      });
    }
  }
}

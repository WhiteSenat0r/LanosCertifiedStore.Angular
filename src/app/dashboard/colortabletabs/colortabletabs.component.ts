import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Color } from 'src/app/shared/models/color';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-colortabletabs',
  templateUrl: './colortabletabs.component.html',
  styleUrls: ['./colortabletabs.component.css']
})
export class ColortabletabsComponent {

  colors: Color[] = [];

  colorForm: FormGroup;

  currentColorId: string = "";

  currentPage: number = 1;
  pageSize: number = 8;
  pageNumber: number = 1;

  constructor(private dashboardService: DashboardService,) {
    this.colorForm = new FormBuilder().group({
      newColorName: ['', Validators.required],
      newHexValue: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getColor();

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

  getColor() {
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
        this.getColor();
      },
      error: error => console.error('Error adding color:', error)
    });
  }


  deleteColor(colorId: string) {
    this.dashboardService.deleteColor(colorId).subscribe({
      next: response => {
        console.log('Color deleted successfully:', response);
        this.getColor();
      },
      error: error => console.error('Error deleting color:', error)
    });

  }

  setEditedColor(itemId: string) {
    this.currentColorId = itemId;
  }

  UpdateColor(editedColorName: string, editedHexValue: string) {
    console.log('Updating color with id:', this.currentColorId);
    console.log('New name:', editedColorName);
    console.log('New hex:', editedHexValue);
  
    if (!editedColorName.trim() || !editedHexValue.trim()) {
      console.error('Updated name and hex value cannot be empty');
      return;
    }
  
    this.dashboardService.updateColor(this.currentColorId, editedColorName, editedHexValue).subscribe({
      next: response => {
        console.log('Color updated successfully:', response);
        this.getColor();
      },
      error: error => {
        console.error('Error updating color:', error);
      }
    });
  }
  
}

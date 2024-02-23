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

  currentPage: number = 1;
  pageSize: number = 8;

  constructor(private dashboardService: DashboardService,) {
    this.colorForm = new FormBuilder().group({
      newColorName: ['', Validators.required],
      newHexValue: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getColor();

  }

  getColor() {
    this.dashboardService.getColor().subscribe({
      next: response => this.colors = response,
      error: error => console.error(error),
      complete: () => console.log("GetData Types"),
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

  get totalPages(): number {
    return Math.ceil(this.colors.length / this.pageSize);
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

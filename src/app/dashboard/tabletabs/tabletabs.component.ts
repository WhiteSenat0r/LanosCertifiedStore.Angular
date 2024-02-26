import { Component, OnInit } from '@angular/core';
import { Type } from '../../shared/models/type';
import { DashboardService } from '../dashboard.service';

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


  constructor(private dashboardService: DashboardService) { }

 
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
      error: error => console.error(error),
      complete: () => console.log("GetData Types"),
    })
  }

  addType(newTypeName: string) {
    this.dashboardService.addType(newTypeName).subscribe({
      next: response => {
        console.log('Type added successfully:', response);
        this.getTypes();
      },
      error: error => console.error('Error adding type:', error)
    });
  }


  deleteType(typeId: string) {
    this.dashboardService.deleteType(typeId).subscribe({
      next: response => {
        console.log('Type deleted successfully:', response);
        this.getTypes();
      },
      error: error => console.error('Error deleting type:', error)
    });
  }

  setEditedType(itemId: string) {
    this.currentTypeId = itemId;
  }

  updateType(newName: string) {
    if (!newName.trim()) {
      console.error('Updated name cannot be empty');
      return;
    }

    console.log('Updating type with id:', this.currentTypeId);
    console.log('New name:', newName);

    this.dashboardService.updateType(this.currentTypeId, newName).subscribe({
      next: response => {
        console.log('Type updated successfully:', response);
        this.getTypes();
      },
      error: error => {
        console.error('Error updating type:', error);
      }
    });
  }

}

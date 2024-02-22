import { Component, OnInit } from '@angular/core';
import { Model } from '../../shared/models/model';
import { Brand } from '../../shared/models/brand';
import { Type } from '../../shared/models/type';
import { Color } from '../../shared/models/color';
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

  constructor(private dashboardService: DashboardService,) {

  }
  originalModels: Model[] = [];

  ngOnInit(): void {
    this.getTypes();
  }

  getTypes() {
    this.dashboardService.getTypes().subscribe({
      next: response => this.types = response,
      error: error => console.error(error),
      complete: () => console.log("GetData Types"),
    })
  }
  get totalPages(): number {
    return Math.ceil(this.types.length / this.pageSize);
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

  updateType(typeId: string, updatedName: string): void {
    this.dashboardService.updateType(typeId, updatedName)
      .subscribe(() => {
        // Після успішного оновлення, оновити дані типів
        this.getTypes();
        // Закрити модальне вікно або виконати інші дії
      });
  }

}



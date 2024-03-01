import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/shared/models/model';
import { Type } from 'src/app/shared/models/type';
import { Brand } from 'src/app/shared/models/brand';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modeltabletabs',
  templateUrl: './modeltabletabs.component.html',
  styleUrls: ['./modeltabletabs.component.css']
})
export class ModeltabletabsComponent implements OnInit {

  models: Model[] = [];
  brands: Brand[] = [];
  types: Type[] = [];

  currentPage: number = 1;
  pageSize: number = 8;
  pageNumber: number = 1;

  currentModelId: string = '';

  newModelForm: FormGroup;
  editedModelForm: FormGroup;

  showAlert: boolean = false;

  selectedModel: Model | null = null; 

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private toastr: ToastrService
  ) {
    this.newModelForm = this.formBuilder.group({
      selectedBrandId: ['', Validators.required],
      newModelName: ['', Validators.required],
      selectedTypeIds: ['', Validators.required]
    });

    this.editedModelForm = this.formBuilder.group({
      editedModelName: ['', Validators.required],
      selectedBrandId: ['', Validators.required],
      selectedTypeIds: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getModels();
    this.getBrands();
    this.getTypes();
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
      this.pageNumber = page;
    }
  }

  getModels() {
    this.dashboardService.getModel().subscribe({
      next: response => {
        this.models = response;
      },
      error: error => {
        console.error(error);
        this.toastr.error('Помилка завантаження моделей');
      }
    });
  }

  getTypes() {
    this.dashboardService.getTypes().subscribe({
      next: response => {
        this.types = response;
      },
      error: error => {
        console.error(error);
        this.toastr.error('Помилка завантаження типів');
      }
    });
  }

  getBrands() {
    this.dashboardService.getBrands().subscribe({
      next: response => {
        this.brands = response;
      },
      error: error => {
        console.error(error);
        this.toastr.error('Помилка завантаження брендів');
      }
    });
  }

  addModel() {
    if (this.newModelForm.valid) {
      const selectedBrandId = this.newModelForm.value.selectedBrandId;
      const newModelName = this.newModelForm.value.newModelName;
      const selectedTypeIds = this.newModelForm.value.selectedTypeIds;

      this.dashboardService.addModel(newModelName, selectedBrandId, selectedTypeIds).subscribe({
        next: response => {
          this.getModels();
          this.newModelForm.reset();
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;

          }, 3000);
        },
        error: error => {
          console.error('Помилка додавання моделі:', error);
          this.toastr.error('Помилка додавання моделі');
          this.newModelForm.reset();
        }
      });
    }
  }

  setEditedModel(itemId: string) {
    this.currentModelId = itemId;
    const modelToEdit = this.models.find(item => item.id === itemId);
    if (modelToEdit) {
      this.selectedModel = modelToEdit;
    }
  }

  deleteModel() {
    this.dashboardService.deleteModel(this.currentModelId).subscribe({
      next: response => {
        this.toastr.success('Модель успішно видалена');
        this.getModels();
      },
      error: error => {
        console.error(error);
        this.toastr.error('Помилка видалення моделі');
      }
    });
  }

  updateModel() {
    if (this.editedModelForm.valid) {
      const newName = this.editedModelForm.value.editedModelName;
      const modelId = this.currentModelId;
      this.dashboardService.updateModel(modelId, newName, this.editedModelForm.value.selectedBrandId, this.editedModelForm.value.selectedTypeIds).subscribe({
        next: response => {
          console.log(response);
          this.newModelForm.reset();
          this.toastr.success('Модель успішно оновлена!');
          this.getModels();
        },
        error: error => {
          console.error(error);
          this.editedModelForm.reset();
          this.toastr.error('Помилка оновлення моделі');
        }
      });
    }
  }

}

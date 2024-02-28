import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient){ }

  get404Error()
  {
    this.http.get(this.baseUrl + 'Vehicles/3123').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get500Error()
  {
    this.http.get(this.baseUrl + 'Brands?Name=2&ContainedModelName=2&PageIndex=3&ItemQuantity=4&MaxQuantityPerRequest=-1&SortingType=6').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get400Error()
  {
    this.http.get(this.baseUrl + 'Model').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get405Error()
  {
    this.http.get(this.baseUrl + 'Brands/374').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }
}

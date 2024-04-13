import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/shared/models/brand';
import { Pagination } from 'src/app/shared/models/pagination';
import { environment } from 'src/environments/environments';
import { CatalogVehicle } from '../models/catalogVehicle';
import { CatalogParams } from '../models/catalogParams';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  
  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  }

  getBrands(): Observable<Pagination<Brand>> {
    return this.http.get<Pagination<Brand>>(this.baseUrl + "Brands");
  }

  getVehicles(catalogParams: CatalogParams): Observable<Pagination<CatalogVehicle>> {
    let params = new HttpParams();

    if (catalogParams.typeName != '')
      params = params.append('Type', catalogParams.typeName);
    if (catalogParams.brandName != '')
      params = params.append('Brand', catalogParams.brandName);
    if (catalogParams.modelName != '')
      params = params.append('Model', catalogParams.modelName);
    if (catalogParams.colorName != '')
      params = params.append('Color', catalogParams.colorName);
    if (catalogParams.sort != '')
      params = params.append('SortingType', catalogParams.sort);

    params = params.append('LowerPriceLimit', catalogParams.lowerPriceLimit);
    params = params.append('UpperPriceLimit', catalogParams.upperPriceLimit);

    //pagination
    params = params.append('pageIndex', catalogParams.pageNumber);

    params = params.append('ItemQuantity', catalogParams.pageSize);

    params = params.append('selectionProfile', 2);

    return this.http.get<Pagination<CatalogVehicle>>(this.baseUrl + 'Vehicles', {
      params,
    });
  }
}

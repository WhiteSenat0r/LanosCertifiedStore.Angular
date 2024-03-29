import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Vehicle } from '../../shared/models/vehicle';
import { Type } from '../../shared/models/type';
import { Brand } from '../../shared/models/brand';
import { Pagination } from '../../shared/models/pagination';
import { CatalogParams } from '../../shared/models/catalogParams';
import { Color } from '../../shared/models/color';
import { Model } from '../../shared/models/model';
import { CatalogVehicle } from '../../shared/models/CatalogVehicle';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
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

  getVehicles(catalogParams: CatalogParams) {
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

    if (catalogParams.minimalPriceDate) {
      params = params.append(
        'MinimalPriceDate',
        this.formatDate(catalogParams.minimalPriceDate)
      );
      params = params.append('LowerPriceLimit', catalogParams.lowerPriceLimit);
      params = params.append('UpperPriceLimit', catalogParams.upperPriceLimit);
    }

    //pagination
    params = params.append('pageIndex', catalogParams.pageNumber);

    params = params.append('ItemQuantity', catalogParams.pageSize);

    params = params.append('selectionProfile', 2);

    return this.http.get<Pagination<CatalogVehicle>>(this.baseUrl + 'Vehicles', {
      params,
    });
  }

  getVehicle(id: string) {
    return this.http.get<Vehicle>(this.baseUrl + 'Vehicles' + '/' + id);
  }

  getTypes() {
    return this.http.get<Pagination<Type>>(this.baseUrl + 'Types');
  }

  getBrands() {
    return this.http.get<Pagination<Brand>>(this.baseUrl + 'Brands');
  }

  getModels() {
    return this.http.get<Pagination<Model>>(this.baseUrl + 'Models?selectionProfile=1');
  }

  getColors() {
    return this.http.get<Pagination<Color>>(this.baseUrl + 'Colors');
  }
}

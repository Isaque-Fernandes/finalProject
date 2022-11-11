import { Injectable } from '@angular/core';
import { ProductModel } from '../model/product-model.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as uuid from 'uuid';
import { Observable } from 'rxjs';
import { NgIfContext } from '@angular/common';
import { ProviderAddressModel } from '../model/provider-address-model.model';

const API_URL = 'https://viacep.com.br/ws/24230541/json/';
const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json;charset=utf-8'
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class OnlineStoreService {

  constructor(
    private http: HttpClient,
  ) { }

  requestCEP(cepNumber: string): Observable<ProviderAddressModel> {
    const cep = this.http.get<ProviderAddressModel>(`http://viacep.com.br/ws/${cepNumber}/json/`);
    return cep;
  }

  listService(): ProductModel[] {
    return JSON.parse(localStorage.getItem('products')!) as ProductModel[] ?? [];
  }

  registerService(product: ProductModel): void {
    let products = this.listService();

    product.id = uuid.v4();
    products.push(product);

    localStorage.setItem('products', JSON.stringify(products));
  }

  updateService(product: ProductModel): void {
    let products = this.listService();

    for (let i = 0; i < products.length; i++) {
      if (product.id === products[i].id) {
        products[i] = product;
      }
    }
    localStorage.setItem('products', JSON.stringify(products));
  }

  deleteService(id: string): void {
    let products = this.listService();

    let newProducts: ProductModel[] = [];

    for (let i = 0; i < products.length; i++) {
      if (products[i].id !== id) {
        newProducts.push(products[i]);
      }
    }
    products = newProducts;
    localStorage.setItem('products', JSON.stringify(products));
  }

  findById(id: string): ProductModel {
    const products: ProductModel[] = this.listService();
    let product!: ProductModel;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        product = products[i];
        break;
      }
    }
    return product;
  }
}

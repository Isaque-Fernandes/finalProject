import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from '../model/product-model.model';
import { OnlineStoreService } from '../services/online-store.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ProviderAddressModel } from '../model/provider-address-model.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  productForm!: FormGroup;

  product!: ProductModel[];
  address!: ProviderAddressModel[];
  msg!: string;
  categorys = ['Batery', 'Camera', 'Coffeshop', 'Drone', 'Smartclock', 'Smartphone'];
  providers = ['Duracell', 'Canon', 'Nescafe', 'Samsung', 'Apple', 'LG'];

  constructor(
    private productBuilder: FormBuilder,
    private productService: OnlineStoreService,
  ) { }

  ngOnInit(): void {
    this.productForm = this.productBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-zÀ-ú0-9 ]+$/)]],
      category: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.pattern(/^[!(e)1-9 ]/)]],
      factoryPrice: ['', [Validators.required, Validators.pattern(/^[!(e)1-9]/)]],
      salePrice: ['', [Validators.required, Validators.pattern(/^[!(e)1-9]/)]],
      provider: ['', [Validators.required,]],
      address: this.productBuilder.group({
        cep: ['', [Validators.required]],
        uf: ['', [Validators.required]],
        localidade: ['', [Validators.required]],
      }),
    });
  }

  register() {
    const product = this.productForm.getRawValue() as ProductModel;
    product.startDate = new Date();
    this.productService.registerService(product);
    this.msg = "Success";
  }

  verifyCEP() {
    const cep = this.productForm.get('address')?.getRawValue() as ProviderAddressModel;
    // console.log(cep)
    const receivedCEP = this.productService.getCEP(cep.cep);
    receivedCEP.subscribe({
      next: (cep) => {
        this.refresForm(cep)
      },
      error: (err) => {
        // console.log(err)
      }
    })
    // console.log(receivedCEP)
  }

  refresForm(address: ProviderAddressModel) {
    this.productForm.get("address")?.patchValue({
      localidade: address.localidade,
      uf: address.uf
    })
  }

  get name() { return this.productForm.get('name')!; }
  get category() { return this.productForm.get('category')!; }
  get quantity() { return this.productForm.get('quantity')!; }
  get factoryPrice() { return this.productForm.get('factoryPrice')!; }
  get salePrice() { return this.productForm.get('salePrice')!; }
  get provider() { return this.productForm.get('provider')!; }

  get cep() { return this.productForm.get("address")?.get("cep")!; }
  get uf() { return this.productForm.get("address")?.get("uf")!; }
  get localidade() { return this.productForm.get("address")?.get("localidade")!; }
}

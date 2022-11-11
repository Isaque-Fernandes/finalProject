import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProviderAddressModel } from '../model/provider-address-model.model';
import { ProductModel } from '../model/product-model.model';
import { OnlineStoreService } from '../services/online-store.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  productForm!: FormGroup;
  msg!: string;
  categorys = ['Batery', 'Camera', 'Coffeshop', 'Drone', 'Smartclock', 'Smartphone'];
  providers = ['Duracell', 'Canon', 'Nescafe', 'Samsung', 'Apple', 'LG'];
  id!: string;
  products!: ProductModel;

  constructor(
    private route: ActivatedRoute,
    private productService: OnlineStoreService,
    private productBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.id = id;

    this.products = this.productService.findById(id);
    // console.log(this.products);

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

    this.loadForm(this.products);
  }

  loadForm(product: ProductModel): void {
    this.productForm.patchValue({
      name: product.name,
      category: product.category,
      quantity: product.quantity,
      factoryPrice: product.factoryPrice,
      salePrice: product.salePrice,
      provider: product.provider,
      address: product.address
    })
  }

  update() {
    this.products.name = this.productForm.get('name')!.value;
    this.products.category = this.productForm.get('category')!.value;
    this.products.quantity = this.productForm.get('quantity')!.value;
    this.products.factoryPrice = this.productForm.get('factoryPrice')!.value;
    this.products.salePrice = this.productForm.get('salePrice')!.value;
    this.products.provider = this.productForm.get('provider')!.value;

    this.products.address.cep = this.cep.value;
    this.products.address.uf = this.uf.value;
    this.products.address.localidade = this.localidade.value;
    
    this.productService.updateService(this.products);
    this.msg = "Success";
  }

  verifyCEP() {
    const cep = this.productForm.get('address')?.getRawValue() as ProviderAddressModel;
    // console.log(cep)
    const receivedCEP = this.productService.getCEP(cep.cep).subscribe({
      next: (end) => {
        this.productForm.get("address")?.patchValue({
          localidade: end.localidade,
          uf: end.uf,
        })
      },
      error: (err) => (console.log(err))
    })
    // console.log(receivedCEP)
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

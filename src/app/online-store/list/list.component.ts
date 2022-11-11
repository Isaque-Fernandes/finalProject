import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductModel } from '../model/product-model.model';
import { OnlineStoreService } from '../services/online-store.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  products!: ProductModel[];
  dataSource!: MatTableDataSource<ProductModel>;
  displayedColumns: string[] = ['startDate', 'name', 'category', 'quantity', 'factoryPrice', 'salePrice', 'provider','providerCep', 'providerUf', 'providerPublicPlace', 'update', 'delete'];
  
  constructor(
    private productServer: OnlineStoreService,
  ) { }

  ngOnInit(): void {
    this.products = this.productServer.listService();
    this.dataSource = new MatTableDataSource(this.products);
  }

  list(): ProductModel[] {
    return this.products;
  }

  delete(id: string): void {
    this.productServer.deleteService(id);
  }
}

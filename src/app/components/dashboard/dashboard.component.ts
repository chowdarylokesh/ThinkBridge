import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from 'src/app/helpers/dialog/dialog.component';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit {

  products!: Array<Product>;
  displayedColumns: string[] = ['name', 'description', 'price', 'rating', 'deleteActionColumn', 'editActionColumn'];
  dataSource !: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _productService: ProductService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer) { }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this._productService.getData().subscribe((products) => {
      this.products = products;
      this.dataSource = new MatTableDataSource(this.products);
    });
    this.products = this._productService.getProducts();
    this.dataSource = new MatTableDataSource(this.products);
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '550px',
      data: 'Are you sure you want to delete the product?',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(id);
      }
    });
  }

  deleteProduct(id: number) {
    this.products = this.products.filter((product, index) => product.id !== id);
    this.dataSource = new MatTableDataSource(this.products);
  }

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '100%',
      data: product,
    });
  }

}

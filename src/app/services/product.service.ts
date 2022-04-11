import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private myData: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  products:Array<Product> = [
    {id:1, name:"Test1",description:"This belongs to Test1", price:"75",rating:"4",deleteActionColumn:"remove",editActionColumn:"edit"},
    {id:2, name:"Test2",description:"This belongs to Test2", price:"85",rating:"4.5",deleteActionColumn:"remove",editActionColumn:"edit"},
    {id:3, name:"Test3",description:"This belongs to Test3", price:"102",rating:"4.8",deleteActionColumn:"remove",editActionColumn:"edit"},
    {id:4, name:"Test4",description:"This belongs to Test4", price:"15",rating:"4.6",deleteActionColumn:"remove",editActionColumn:"edit"},
    {id:5, name:"Test5",description:"This belongs to Test5", price:"150",rating:"4.7",deleteActionColumn:"remove",editActionColumn:"edit"},
    {id:6, name:"Test6",description:"This belongs to Test6", price:"250",rating:"4.9",deleteActionColumn:"remove",editActionColumn:"edit"},
    {id:7, name:"Test7",description:"This belongs to Test7", price:"1000",rating:"5",deleteActionColumn:"remove",editActionColumn:"edit"},
  ]

  constructor(private _snackBar: MatSnackBar) { }

  addProducts(newProduct:Product) {
    this.products.push(newProduct);
    this.myData.next(this.products);
  }

  getProducts():Array<Product> {
    return this.products;
  }

  setProducts(products:Array<Product>) {
    this.products = products;
    this.myData.next(this.products);
  }
 
  getData(): Observable<Product[]> {
    return this.myData;
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
    });
  }
}

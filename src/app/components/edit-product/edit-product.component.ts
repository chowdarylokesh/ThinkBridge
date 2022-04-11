import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/helpers/dialog/dialog.component';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  addProductForm!: FormGroup;
  productId!: number;
  products!: Array<Product>;
  product = new Product();

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private fb: FormBuilder,
    private _productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.products = this._productService.getProducts();
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      rating: ['', Validators.required,]
    });
    this.productId = this.data.id;
    this.addProductForm.controls['name'].setValue(this.data.name);
    this.addProductForm.controls['description'].setValue(this.data.description);
    this.addProductForm.controls['price'].setValue(this.data.price);
    this.addProductForm.controls['rating'].setValue(this.data.rating);
  }

  saveProduct() {
    this.product.id = this.productId;
    this.product.name = this.addProductForm.controls['name'].value;
    this.product.description = this.addProductForm.controls['description'].value;
    this.product.price = this.addProductForm.controls['price'].value;
    this.product.rating = this.addProductForm.controls['rating'].value;

    let productIndex = this.products.findIndex(product => product.id == this.productId);
    this.products[productIndex] = this.product;
    this._productService.setProducts(this.products);
    this.dialogRef.close();
    this._productService.showSnackBar("Product updated successfully.");
  }

}

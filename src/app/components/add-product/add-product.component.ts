import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm!: FormGroup;
  product = new Product();
  products!: Array<Product>;

  constructor(private fb: FormBuilder,
              private _productService: ProductService,
              ) { }

  ngOnInit(): void {
    this.products = this._productService.getProducts();
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      rating: ['', Validators.required,]
    });
  }

  get f() { return this.addProductForm.controls; }

  submitForm() {
    if (this.addProductForm.invalid) {
      return;
    }
    this.product = new Product();
    this.product.id = this.products.length + 1;
    this.product.name = this.addProductForm.controls['name'].value;
    this.product.description = this.addProductForm.controls['description'].value;
    this.product.price = this.addProductForm.controls['price'].value;
    this.product.rating = this.addProductForm.controls['rating'].value;
    this._productService.addProducts(this.product);
    this.addProductForm.reset();
    this._productService.showSnackBar("Product added successfully.");
  }


}

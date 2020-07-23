import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { ProductService } from '../../../services/data/product.service';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css']
})
export class ProductsHomeComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    private _snackBar: MatSnackBar,   

  ) { }
  public  products: any=  [];
  public currentUser;
  productsStocks: any = [];
  productsByCategory: any =[];
  categories: any = [];
  activeCategory = '';
  breakpoint: any;
  public searchText = '';
  public userUid: string = null;
  getCategoriesSubscription: Subscription;
  control: FormControl = new FormControl('');
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit() {
  this.getCurrentUser();
  this.getProducts();
  this.getCategories();
  this.breakpoint = (window.innerWidth <= 600) ? 1 : (window.innerWidth <= 850) ? 2 : (window.innerWidth <= 1050) ? 3 : 4;
  }

  onResize(event) {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : (window.innerWidth <= 850) ? 2 : (window.innerWidth <= 1050) ? 3 : 4;
  }

  getCategories() {
      this.getCategoriesSubscription = this.productService.getCategories(this.currentUser.activeStoreUid).subscribe(data => {
        let categories = {};
        categories = data.map(e => {
          return {
            uid: e.payload.doc.id,
            name: e.payload.doc.data()['name'],
            storeUid: e.payload.doc.data()['storeUid'],
          };
        });
        this.categories = categories;
        console.log(this.categories); 
      });

  }

  getProducts(){
      this.productService.getProducts(this.currentUser.activeStoreUid).
      subscribe(data => {
        let products = {};
        products = data.map(e => {
          return {
            uid: e.payload.doc.id,
            category: e.payload.doc.data()['category'],
            cost: e.payload.doc.data()['cost'],
            name: e.payload.doc.data()['name'],
            price: e.payload.doc.data()['price'],
            productCode: e.payload.doc.data()['productCode'],
            saleType: e.payload.doc.data()['saleType'],
            stock: e.payload.doc.data()['stock'],
            description: e.payload.doc.data()['description'],
            storeUid: e.payload.doc.data()['storeUid'],
          };
        });
        this.products = products;
        this.productsStocks = this.products.filter(element => element.stock > 0);
      });
    this.breakpoint = (window.innerWidth <= 600) ? 1 : (window.innerWidth <= 850) ? 2 : (window.innerWidth <= 1050) ? 3 : 4;

  }

  getCurrentUser(){
  this.currentUser= JSON.parse(localStorage.getItem('user'));
  console.log(this.currentUser);
  }



}

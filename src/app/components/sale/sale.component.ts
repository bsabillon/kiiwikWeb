import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from '../../services/data/orders.service';


@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  orders: any=  [];
  public currentUser;

  constructor(
    private ordersService: OrdersService,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    private _snackBar: MatSnackBar, 

  ) { }

  breakpoint: any;
  public searchText = '';
  public userUid: string = null;
  control: FormControl = new FormControl('');
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  ngOnInit() {
    this.getCurrentUser();
    this.getOrders();
    this.breakpoint = (window.innerWidth <= 600) ? 1 : (window.innerWidth <= 850) ? 2 : (window.innerWidth <= 1050) ? 3 : 4;
  }
  onResize(event) {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : (window.innerWidth <= 850) ? 2 : (window.innerWidth <= 1050) ? 3 : 4;
  }

  getOrders() {
    this.ordersService.getOrders(this.currentUser.activeStoreUid).subscribe(data => {
        let orders = {};
        orders = data.map(e => {
          return {
            uid: e.payload.doc.id,
            clientName: e.payload.doc.data()['clientName'],
            createdAT: e.payload.doc.data()['createdAT'],
            status: e.payload.doc.data()['status'],
            storeUid: e.payload.doc.data()['storeUid'],
          };
        });
        this.orders = orders;
      }, (error) => {
        console.log(error);
        
      });
      
  }
  
    getCurrentUser(){
      this.currentUser= JSON.parse(localStorage.getItem('user'));
      console.log(this.currentUser);
      }

}

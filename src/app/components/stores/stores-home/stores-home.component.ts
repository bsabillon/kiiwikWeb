import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { StoresService } from '../../../services/data/stores.service';



@Component({
  selector: 'app-stores-home',
  templateUrl: './stores-home.component.html',
  styleUrls: ['./stores-home.component.css']
})
export class StoresHomeComponent implements OnInit {
  stores: any=  [];
  public currentUser;

  constructor(
    private storeService: StoresService,
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
    this.getStores();
    this.breakpoint = (window.innerWidth <= 600) ? 1 : (window.innerWidth <= 850) ? 2 : (window.innerWidth <= 1050) ? 3 : 4;

  }
  
  onResize(event) {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : (window.innerWidth <= 850) ? 2 : (window.innerWidth <= 1050) ? 3 : 4;
  }

  getStores() {
    this.storeService.getStores(this.currentUser.activeStoreUid).subscribe(data => {
        let stores = {};
        stores = data.map(e => {
          return {
            orderUid: e.payload.doc.id,
            storeName: e.payload.doc.data()['storeName'],
            collaborators: e.payload.doc.data()['collaborators']
          };
        });
        this.stores = stores;
      }, (error) => {
        console.log(error);
      });
      
  }
  
    getCurrentUser(){
      this.currentUser= JSON.parse(localStorage.getItem('user'));
      console.log(this.currentUser);
      }
  

}

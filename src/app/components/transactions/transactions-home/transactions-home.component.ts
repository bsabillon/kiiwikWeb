import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { TransactionsService } from '../../../services/data/transactions.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-transactions-home',
  templateUrl: './transactions-home.component.html',
  styleUrls: ['./transactions-home.component.css']
})
export class TransactionsHomeComponent implements OnInit {
  transactions: any=  [];
  public currentUser;

  constructor(
    private transactionService: TransactionsService,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    private _snackBar: MatSnackBar,  

  ) { }
  //getTransactionsSubscription: Subscription;
  

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
    this.getTransactions();
    this.breakpoint = (window.innerWidth <= 600) ? 1 : (window.innerWidth <= 850) ? 2 : (window.innerWidth <= 1050) ? 3 : 4;

  }

  onResize(event) {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : (window.innerWidth <= 850) ? 2 : (window.innerWidth <= 1050) ? 3 : 4;
  }

  getTransactions() {
  this.transactionService.getTransactions(this.currentUser.activeStoreUid).subscribe(data => {
      let transactions = {};
      transactions = data.map(e => {
        return {
          orderUid: e.payload.doc.id,
          clientName: e.payload.doc.data()['clientName'],
          date: e.payload.doc.data()['date'],
          storeUid: e.payload.doc.data()['storeUid'],
        };
      });
      this.transactions = transactions;
    }, (error) => {
      console.log(error);
      
    });
    
}

  getCurrentUser(){
    this.currentUser= JSON.parse(localStorage.getItem('user'));
    console.log(this.currentUser);
    }


}

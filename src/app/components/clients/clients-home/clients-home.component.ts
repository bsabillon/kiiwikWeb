import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ClientsService } from '../../../services/data/clients.service';
import { AuthService } from 'src/app/services/auth.service';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-clients-home',
  templateUrl: './clients-home.component.html',
  styleUrls: ['./clients-home.component.css']
})
export class ClientsHomeComponent implements OnInit {
  getClientsSubscription: Subscription;
  clients: any = [];
  public currentUser;

  constructor(
    public authService: AuthService,
    public clientsService: ClientsService,
    private breakpointObserver: BreakpointObserver,

  ) { }
  control: FormControl = new FormControl('');
  breakpoint: any;
  public searchText = '';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    
  ngOnInit() {
    this.getCurrentUser();
    this.getClients();
    this.breakpoint = (window.innerWidth <= 600) ? 1 : (window.innerWidth <= 850) ? 2 : (window.innerWidth <= 1050) ? 3 : 4;
  }

  onResize(event) {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : (window.innerWidth <= 850) ? 2 : (window.innerWidth <= 1050) ? 3 : 4;
  }

  getClients() {
      this.getClientsSubscription = this.clientsService.getClients(this.currentUser.activeStoreUid).subscribe(data => {
        let clients = {};
        clients = data.map(e => {
          return {
            uid: e.payload.doc.id,
            clientName: e.payload.doc.data()['clientName'],
            clientID: e.payload.doc.data()['clientID'],
            clientRTN: e.payload.doc.data()['clientRTN'],
            clientPhone: e.payload.doc.data()['clientPhone'],
            clientEmail: e.payload.doc.data()['clientEmail'],
            storeUid: e.payload.doc.data()['storeUid'],
          };
        });
        this.clients = clients;
      }, (error) => {
        console.log(error);
      });
  }

  async deleteClient(client) {
    this.clientsService.deletClient(client.uid).then((data) => {
    }).catch((error) => {
      console.log(error);
    });
  }

  getCurrentUser(){
    this.currentUser= JSON.parse(localStorage.getItem('user'));
    console.log(this.currentUser);
    }


}

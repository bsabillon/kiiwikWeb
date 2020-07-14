import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private authService: AuthService,private router: Router,) {}
  public isAuth: boolean=false;

  ngOnInit() {
    this.getCurrentUser();
   // this.getAdminUser();
  }

  onLogOut(){
    this.authService.onLogOut();
    localStorage.clear();
   }

   getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        this.isAuth = true;
      } else {
        console.log('NOT user logged');
        this.isAuth = false;
      }
    });
  }

}

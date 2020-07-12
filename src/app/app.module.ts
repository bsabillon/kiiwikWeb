import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PasswordRecoveryComponent } from './components/auth/password-recovery/password-recovery.component';

import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { environment } from './../environments/environment';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { SaleComponent } from './components/sale/sale.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { StoresHomeComponent } from './components/stores/stores-home/stores-home.component';
import { ProductsHomeComponent } from './components/products/products-home/products-home.component';
import { TransactionsHomeComponent } from './components/transactions/transactions-home/transactions-home.component';
import { ClientsHomeComponent } from './components/clients/clients-home/clients-home.component';
import { UsersHomeComponent } from './components/users/users-home/users-home.component';
import { HelpHomeComponent } from './components/help/help-home/help-home.component';
import { SettingsHomeComponent } from './components/settings/settings-home/settings-home.component';

@NgModule({
  declarations: [
    AppComponent,
    
    RegisterComponent,
    LoginComponent,
    PasswordRecoveryComponent,
    SaleComponent,
    MainNavComponent,
    StoresHomeComponent,
    ProductsHomeComponent,
    TransactionsHomeComponent,
    ClientsHomeComponent,
    UsersHomeComponent,
    HelpHomeComponent,
    SettingsHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  ReactiveFormsModule,FormsModule,
    BrowserAnimationsModule,MatToolbarModule,MatButtonModule,MatIconModule,MatCardModule,MatFormFieldModule,MatInputModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,AngularFireAuthModule,AngularFireDatabaseModule, LayoutModule, MatSidenavModule, MatListModule
  ],
  providers: [AngularFirestore,AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SaleComponent } from './components/sale/sale.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { StoresHomeComponent } from './components/stores/stores-home/stores-home.component';
import { ProductsHomeComponent } from './components/products/products-home/products-home.component';
import { TransactionsHomeComponent } from './components/transactions/transactions-home/transactions-home.component';
import { ClientsHomeComponent } from './components/clients/clients-home/clients-home.component';
import { UsersHomeComponent } from './components/users/users-home/users-home.component';
import { SettingsHomeComponent } from './components/settings/settings-home/settings-home.component';
import { HelpHomeComponent } from './components/help/help-home/help-home.component';



const routes: Routes = [
  { path: '', component: RegisterComponent},
  { path: 'auth/login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'sale', component: SaleComponent, canActivate: [AuthGuard]  },
  { path: 'stores', component: StoresHomeComponent, canActivate: [AuthGuard]  },
  { path: 'products', component: ProductsHomeComponent, canActivate: [AuthGuard]  },
  { path: 'transactions', component: TransactionsHomeComponent, canActivate: [AuthGuard]  },
  { path: 'clients', component: ClientsHomeComponent, canActivate: [AuthGuard]  },
  { path: 'users', component: UsersHomeComponent, canActivate: [AuthGuard]  },
  { path: 'settings', component: SettingsHomeComponent, canActivate: [AuthGuard]  },
  { path: 'help', component: HelpHomeComponent, canActivate: [AuthGuard]  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

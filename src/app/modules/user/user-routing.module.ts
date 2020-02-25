import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { BasicTemplateComponent as BasicTemplate } from './templates/basic-template/basic-template.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { TransaccionesComponent } from './pages/transacciones/transacciones.component';
import { AccountsComponent } from './pages/accounts/accounts.component';

const routes: Routes = [
  {
    path: '',
    component: BasicTemplate,
    children: [
      {
        path: '',
        component: IndexComponent
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [GuestGuard]
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'accounts',
        component: AccountsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'transacciones',
        component: TransaccionesComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

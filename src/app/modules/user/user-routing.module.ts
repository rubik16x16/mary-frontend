import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { BasicTemplateComponent as BasicTemplate } from './templates/basic-template/basic-template.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { TransactionsComponent } from './pages/accounts/transactions/transactions.component';
import { TransactionsResolverService } from './pages/accounts/transactions/transactions-resolver.service';
import { CategoriesComponent } from './pages/categories/categories.component';

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
				canActivate: [AuthGuard],
			},
			{
				path: 'accounts/:id',
				canActivate: [AuthGuard],
				children: [
					{
						path: 'transactions',
						component: TransactionsComponent,
						canActivate: [AuthGuard],
						resolve: {
							data: TransactionsResolverService
						}
					}
				]
			},
			{
				path: 'categories',
				canActivate: [AuthGuard],
				component: CategoriesComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserRoutingModule { }

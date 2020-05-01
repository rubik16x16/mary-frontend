import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './pages/index/index.component';
import { UserRoutingModule } from './user-routing.module';
import { BasicTemplateComponent } from './templates/basic-template/basic-template.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GlobalModule } from 'src/app/global.module';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { CreateModalComponent as AccountCreateModalComponent } from './pages/accounts/create-modal/create-modal.component';
import { EditModalComponent as AccountEditModalComponent } from './pages/accounts/edit-modal/edit-modal.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { TransactionsComponent } from './pages/accounts/transactions/transactions.component';
import { CreateModalComponent as TransactionsCreateModalComponent } from './pages/accounts/transactions/create-modal/create-modal.component';
import { EditModalComponent as TransactionsEditModalComponent } from './pages/accounts/transactions/edit-modal/edit-modal.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CreateModalComponent as CategoriesCreateModalComponent } from './pages/categories/create-modal/create-modal.component';
import { EditModalComponent as CategoriesEditModalComponent } from './pages/categories/edit-modal/edit-modal.component';

@NgModule({
	declarations: [
		IndexComponent, BasicTemplateComponent,
		LoginComponent, RegisterComponent, DashboardComponent,
		AccountsComponent, AccountCreateModalComponent, DialogComponent,
		AccountEditModalComponent, TransactionsComponent,
		TransactionsCreateModalComponent, TransactionsEditModalComponent,
		CategoriesComponent, CategoriesCreateModalComponent, CategoriesEditModalComponent
	],
	imports: [
		CommonModule,
		UserRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		MaterialModule,
		FlexLayoutModule,
		GlobalModule,
		NgMaterialMultilevelMenuModule,
	],
	entryComponents: [
	]
})

export class UserModule { }

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
import { TransaccionesComponent } from './pages/transacciones/transacciones.component';
import { GlobalModule } from 'src/app/global.module';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { CreateComponent as TransaccionCreateModal } from './pages/transacciones/create/create.component';

@NgModule({
  declarations: [
    IndexComponent, BasicTemplateComponent,
    LoginComponent, RegisterComponent, DashboardComponent,
    TransaccionesComponent, TransaccionCreateModal
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
    TransaccionCreateModal
  ]
})

export class UserModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './pages/index/index.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})

export class UserModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanDirective } from './directives/can.directive';
import { InputMaskComponent } from './components/input-mask/input-mask.component';

@NgModule({
  declarations: [
    CanDirective, InputMaskComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CanDirective,
    InputMaskComponent
  ]
})
export class GlobalModule { }

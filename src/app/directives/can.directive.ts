import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appCan]'
})
export class CanDirective implements OnInit{

  constructor(
    private elr: ElementRef,
    private authService: AuthService
  ) { }

  @Input('appCan') permission: string;

  ngOnInit() {

    let permissions = this.authService.getUserPermissions();

    if(permissions.indexOf(this.permission) < 0){

      this.elr.nativeElement.style.display = 'none';
    }
  }
}

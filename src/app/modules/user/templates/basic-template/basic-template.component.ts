import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-template',
  templateUrl: './basic-template.component.html',
  styleUrls: ['./basic-template.component.scss']
})
export class BasicTemplateComponent implements OnInit {

  sideBarOpened:boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }// end ngOnInit

  toggleSideBar() {

    this.sideBarOpened = !this.sideBarOpened;
    console.log(this.sideBarOpened);
  }// end toggleSideBar

  logOut() {

    this.authService.logOut();
    this.router.navigate(['/login']);
  }// end logOut
}

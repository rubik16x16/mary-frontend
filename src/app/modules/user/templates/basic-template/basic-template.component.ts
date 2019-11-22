import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-template',
  templateUrl: './basic-template.component.html',
  styleUrls: ['./basic-template.component.scss']
})
export class BasicTemplateComponent implements OnInit {

  sideBarOpened:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleSideBar(){

    this.sideBarOpened = !this.sideBarOpened;
    console.log(this.sideBarOpened);
  }
}

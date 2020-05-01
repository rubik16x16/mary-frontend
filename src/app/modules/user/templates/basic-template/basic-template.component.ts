import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoadBarService } from '../../../../services/load-bar.service';
import { delay } from 'rxjs/operators';

@Component({
	selector: 'app-basic-template',
	templateUrl: './basic-template.component.html',
	styleUrls: ['./basic-template.component.scss']
})
export class BasicTemplateComponent implements OnInit {

	sideBarOpened: boolean = false;
	showLoadBar: boolean = false;

	config = {
		paddingAtStart: true,
		interfaceWithRoute: true,
		classname: 'my-custom-class',
		listBackgroundColor: `rgb(208, 241, 239)`,
		fontColor: `rgb(8, 54, 71)`,
		backgroundColor: `rgb(208, 241, 239)`,
		selectedListFontColor: `red`,
		highlightOnSelect: true,
		collapseOnSelect: true,
		rtlLayout: false
	};

	appitems = [
		{
			label: 'Mary',
			imageIcon: 'favicon.ico',
			url: '/dashboard',
		},
		{
			label: 'Accounts',
			icon: 'alarm',
			url: '/accounts'
		},
		{
			label: 'Categories',
			icon: 'alarm',
			url: '/categories'
		}
	];

	constructor(
		private authService: AuthService,
		private router: Router,
		private loadBarService: LoadBarService
	) { }

	ngOnInit() {

		this.loadBarService.loading$.pipe(
			delay(0)
		).subscribe(res => {

			this.showLoadBar = res;
		});
	}

	toggleSideBar() {

		this.sideBarOpened = !this.sideBarOpened;
	}

	logOut() {

		this.authService.logOut();
		this.router.navigate(['/login']);
	}

	isLogin() {

		return this.authService.isLogin();
	}

	selectedItem(item: any) {

		this.router.navigate([item.url]);
		this.sideBarOpened = false;
	}

	selectedLabel(label: any) {

	}
}

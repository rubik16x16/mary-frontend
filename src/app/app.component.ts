import { Component } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';
import { LoadBarService } from './services/load-bar.service';

@Component({
	selector: 'app-root',
	template: '<router-outlet></router-outlet>',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'mary-frontend';

	constructor(
		private router: Router,
		private loadBarService: LoadBarService
	) {

		this.router.events.subscribe((event: RouterEvent) => {
			switch (true) {
				case event instanceof NavigationStart: {
					this.loadBarService.showLoadBar(true);
					break;
				}
				case event instanceof NavigationEnd: {
					this.loadBarService.showLoadBar(false);
					break;
				}
			}
		});
	}
}

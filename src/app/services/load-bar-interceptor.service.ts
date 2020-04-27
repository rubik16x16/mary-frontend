import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadBarService } from './load-bar.service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class LoadBarInterceptorService implements HttpInterceptor {

	constructor(
		private loadBarService: LoadBarService
	) { }

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {

		this.loadBarService.showLoadBar(true);

		return next.handle(req).pipe(
			finalize(() => {
				this.loadBarService.showLoadBar(false);
				console.log('finalize');
			})
		);
	}
}

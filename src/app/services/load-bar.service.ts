import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoadBarService {

	private loadingSource = new Subject<boolean>();

	loading$ = this.loadingSource.asObservable();

	constructor() { }

	showLoadBar(value: boolean): void {

		this.loadingSource.next(value);
	}
}

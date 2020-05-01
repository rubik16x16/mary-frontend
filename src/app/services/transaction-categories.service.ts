import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Category } from '../models/transaction/Category';

@Injectable({
	providedIn: 'root'
})
export class TransactionCategoriesService {

	readonly RECORDS_PER_PAGE = 5;

	constructor(
		private httpClient: HttpClient
	) { }

	all(page: number = 1): Observable<any> {

		return this.httpClient.get(`${environment.apiUrl}/user/transaction-categories/?page=${page}`).pipe(
			map((res: any) => {
				return {
					items: res.items.map(item => new Category(item)),
					numPages: res.num_pages
				};
			})
		);
	}

	create(data: Category): Observable<any> {

		return this.httpClient.post(`${environment.apiUrl}/user/transaction-categories/`, data).pipe(
			map((res: any) => {
				return {
					item: new Category(res.item),
					numPages: res.num_pages
				};
			})
		);
	}

	get(categoryId: number): Observable<Category> {

		return this.httpClient.get(`${environment.apiUrl}/user/transaction-categories/${categoryId}/`).pipe(
			map((item: any) => new Category(item))
		);
	}

	update(categoryId: number, data: Category): Observable<Category> {

		return this.httpClient.put(`${environment.apiUrl}/user/transaction-categories/${categoryId}/`, data).pipe(
			map((item: any) => new Category(item))
		);
	}

	delete(categoryId: number, page: number): Observable<any> {

		let url = `${environment.apiUrl}/user/transaction-categories/${categoryId}/?page=${page}`;
		return this.httpClient.delete(url).pipe(
			map((res: any) => {

				return {
					items: res.items.map(item => new Category(item)),
					numPages: res.num_pages
				};
			})
		);
	}
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models/Transaction';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class TransactionService {

	constructor(
		private httpClient: HttpClient
	) { }

	all(accountId: number): Observable<Transaction[]> {

		return this.httpClient.get(`${environment.apiUrl}/user/accounts/${accountId}/transactions/`).pipe(
			map((items: any[]) => {
				return items.map(item => new Transaction(item));
			})
		);
	}

	create(accountId: number, data: any): Observable<Transaction> {

		return this.httpClient.post(`${environment.apiUrl}/user/accounts/${accountId}/transactions/`, data).pipe(
			map((item: any) => new Transaction(item))
		);
	}

	get(transactionId: number): Observable<Transaction> {

		return this.httpClient.get(`${environment.apiUrl}/user/transactions/${transactionId}`).pipe(
			map((item: any) => new Transaction(item))
		);
	}

	update(transactionId: number, data: any): Observable<Transaction> {

		return this.httpClient.put(`${environment.apiUrl}/user/transactions/${transactionId}`, data).pipe(
			map((item: any) => new Transaction(item))
		);
	}

	delete(transactionId: number): Observable<any> {

		return this.httpClient.delete(`${environment.apiUrl}/user/transactions/${transactionId}`);
	}
}

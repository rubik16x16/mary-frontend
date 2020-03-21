import { TestBed } from '@angular/core/testing';

import { TransactionService } from './transaction.service';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Transaction } from '../models/Transaction';

describe('TransactionService', () => {

	let service: TransactionService;
	let httpTestingController: HttpTestingController;
	const TRANSACTIONS_DATA: any[] = [
		{
			id: 1,
			description: 'desc 1',
			amount: 20
		},
		{
			id: 2,
			description: 'desc 2',
			amount: 30
		}
	];

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule
			]
		});
		httpTestingController = TestBed.inject(HttpTestingController);
		service = TestBed.inject(TransactionService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should get all transactions', () => {

		let accountId = 1;
		service.all(accountId).subscribe(res => {

			let transactions = 	TRANSACTIONS_DATA.map(item => new Transaction(item));

			expect(transactions).toEqual(res);
		});

		let req = httpTestingController.expectOne(`${environment.apiUrl}/user/accounts/${accountId}/transactions/`);
		expect(req.request.method).toEqual('GET');
		req.flush(TRANSACTIONS_DATA);
		httpTestingController.verify();
	});

	it('should create a new transaction', () => {

		let accountId = 1;
		service.create(accountId, TRANSACTIONS_DATA[0]).subscribe(res => {

			let transaction = new Transaction(TRANSACTIONS_DATA[0]);

			expect(transaction).not.toBe(res);
			expect(transaction).toEqual(res);
		});

		let req = httpTestingController.expectOne(`${environment.apiUrl}/user/accounts/${accountId}/transactions/`);
		expect(req.request.method).toEqual('POST');
		req.flush(TRANSACTIONS_DATA[0]);
		httpTestingController.verify();
	});

	it('should get a transaction', () => {

		let transactionId = 1;
		service.get(transactionId).subscribe(res => {

			let transaction = new Transaction(TRANSACTIONS_DATA[0]);

			expect(transaction).toEqual(res);
		});

		let req = httpTestingController.expectOne(`${environment.apiUrl}/user/transactions/${transactionId}`);
		expect(req.request.method).toEqual('GET');
		req.flush(TRANSACTIONS_DATA[0]);
		httpTestingController.verify();
	});

	it('should update a transaction', () => {

		let transactionId = 1;
		service.update(transactionId, TRANSACTIONS_DATA[0]).subscribe(res => {

			let transaction = new Transaction(TRANSACTIONS_DATA[0]);

			// console.log(res);
			expect(transaction).toEqual(res);
		});

		let req = httpTestingController.expectOne(`${environment.apiUrl}/user/transactions/${transactionId}`);
		expect(req.request.method).toEqual('PUT');
		req.flush(TRANSACTIONS_DATA[0]);
		httpTestingController.verify();
	});

	it('should delete a transaction', () => {

		let transactionId = 1;
		service.delete(transactionId).subscribe();
		let req = httpTestingController.expectOne(`${environment.apiUrl}/user/transactions/${transactionId}`);
		expect(req.request.method).toEqual('DELETE');
		req.flush('');
		httpTestingController.verify();
	});
});

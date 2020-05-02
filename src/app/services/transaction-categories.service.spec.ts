import { TestBed } from '@angular/core/testing';

import { TransactionCategoriesService } from './transaction-categories.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { Category } from '../models/transaction/Category';

const CATEGORIES_TEST_DATA = [
	{name: 'Category1'}
];

describe('TransactionCategoriesService', () => {
	let service: TransactionCategoriesService;
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule
			]
		});

		httpTestingController = TestBed.inject(HttpTestingController);
		service = TestBed.inject(TransactionCategoriesService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should get all transaction categories', () => {

		let page = 3;
		service.all(page).subscribe(res => {

			let expectedRes = {
				items: CATEGORIES_TEST_DATA.map(item => new Category(item)),
				numPages: page
			};

			expect(expectedRes).toEqual(res);
		});

		let req = httpTestingController.expectOne(`${environment.apiUrl}/user/transaction-categories/?page=${page}`);
		expect(req.request.method).toEqual('GET');
		req.flush({
			items: CATEGORIES_TEST_DATA,
			num_pages: page
		});
		httpTestingController.verify();
	});

	it('should create a new transaction category', () => {

		service.create(new Category(CATEGORIES_TEST_DATA[0])).subscribe(res => {

			let expectedRes = {
				item: new Category(CATEGORIES_TEST_DATA[0]),
				numPages: 1
			};

			expect(expectedRes).toEqual(res);
		});

		let req = httpTestingController.expectOne(`${environment.apiUrl}/user/transaction-categories/`);
		expect(req.request.method).toEqual('POST');
		req.flush({
			item: CATEGORIES_TEST_DATA[0],
			num_pages: 1
		});
		httpTestingController.verify();
	});

	it('should get a transaction category', () => {

		let categoryId = 1;
		service.get(categoryId).subscribe(res => {

			let expectedRes = new Category(CATEGORIES_TEST_DATA[0]);

			expect(expectedRes).toEqual(res);
		});

		let req = httpTestingController.expectOne(`${environment.apiUrl}/user/transaction-categories/${categoryId}/`);
		expect(req.request.method).toEqual('GET');
		req.flush(CATEGORIES_TEST_DATA[0]);
		httpTestingController.verify();
	});

	it('should update a transaction category', () => {

		let categoryId = 1;
		service.update(categoryId, new Category(CATEGORIES_TEST_DATA[0])).subscribe(res => {

			let expectedRes = new Category(CATEGORIES_TEST_DATA[0]);

			expect(expectedRes).toEqual(res);
		});

		let req = httpTestingController.expectOne(`${environment.apiUrl}/user/transaction-categories/${categoryId}/`);
		expect(req.request.method).toEqual('PUT');
		req.flush(CATEGORIES_TEST_DATA[0]);
		httpTestingController.verify();
	});

	it('should delete a transaction category', () => {

		let categoryId = 1;
		service.delete(categoryId, 1).subscribe();
		let req = httpTestingController.expectOne(`${environment.apiUrl}/user/transaction-categories/${categoryId}/?page=1`);
		expect(req.request.method).toEqual('DELETE');
		req.flush({
			items: CATEGORIES_TEST_DATA,
			num_pages: 1
		});
		httpTestingController.verify();
	});
});

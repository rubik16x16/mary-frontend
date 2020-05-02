import { TransactionsComponent } from './transactions.component';
import { ComponentFixture, async, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { TransactionService } from 'src/app/services/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Transaction, TransType } from 'src/app/models/Transaction';
import { of, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Account } from 'src/app/models/Account';
import { RouterTestingModule } from '@angular/router/testing';

let testTransactionsData: any[] = [
	{
		id: 1,
		description: 'Test',
		amount: 300,
		transType: TransType.INCOME
	},
	{
		id: 2,
		description: 'Test2',
		amount: 500,
		transType: TransType.INCOME
	}
];

class MockActivatedRoute {

	snapshot: any = {

		paramMap: {

			get(key: string) {

				return 1;
			}
		}
	};

	data: Observable<any>;

	constructor() {

		let data = {
			data: {
				account: new Account({id: 1, name: 'test', amount: 300}),
				transactions: {
					items: testTransactionsData.map(item => new Transaction(item)),
					numPages: 1
				}
			}
		};
		this.data = of(data);
	}
}

let mockTransactionsService: Partial<TransactionService> = {

	all(accountId: number, page: number): Observable<any> {

		return of({
			items: testTransactionsData.map(item => new Transaction(item)),
			numPages: 1
		});
	},
	create(accountId: number, data: Transaction): Observable<any> {

		return of({
			item: data,
			numPages: 1
		});
	},
	update(transactionId: number, data: Transaction): Observable<any> {

		return of(data);
	},
	delete(transactionId: number, page: number) {

		return of ({
			items: testTransactionsData.splice(0, 1).map(item => new Transaction(item)),
			numPages: 1
		});
	}
};

describe('Transactions page', () => {

	let component: TransactionsComponent;
	let fixture: ComponentFixture<TransactionsComponent>;
	let testTransactions: Transaction[];

	beforeEach(async(() => {

		TestBed.configureTestingModule({
			declarations: [
				TransactionsComponent
			],
			imports: [
				CommonModule,
				RouterTestingModule,
				MaterialModule,
				BrowserAnimationsModule,
				FormsModule,
				ReactiveFormsModule
			],
			providers: [
				{
					provide: TransactionService,
					useValue: mockTransactionsService
				},
				{
					provide: ActivatedRoute,
					useValue: new MockActivatedRoute()
				}
			]
		}).compileComponents();

		fixture = TestBed.createComponent(TransactionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		testTransactions = testTransactionsData.map(item => new Transaction(item));
	}));

	it('should create', fakeAsync(() => {

		expect(component).toBeTruthy();
		flush();
		expect(component.transactions).toEqual(testTransactions);
	}));

	it('should create a new transaction', fakeAsync(() => {

		component.create(TransType.INCOME);
		expect(component.dialogRef.getState()).toBe(0);
		component.dialogRef.close(testTransactionsData[0]);
		fixture.detectChanges();
		expect(component.dialogRef.getState()).toBe(1);
		flush();

		testTransactions.unshift(new Transaction(testTransactionsData[0]));

		expect(component.transactions).toEqual(testTransactions);
	}));

	it('should edit a transaction', fakeAsync(() => {

		let transactionEdit = testTransactionsData[0];

		component.edit(component.transactions[0]);
		expect(component.dialogRef.getState()).toBe(0);
		transactionEdit.description = 'Test x';
		component.dialogRef.close(transactionEdit);
		fixture.detectChanges();
		expect(component.dialogRef.getState()).toBe(1);
		flush();
		testTransactions.splice(0, 1, new Transaction(transactionEdit));
		expect(component.transactions).toEqual(testTransactions);
	}));

	it('should delete a transaction', fakeAsync(() => {

		// Cancel
		component.delete(component.transactions[0]);
		component.dialogRef.close();
		fixture.detectChanges();
		flush();
		expect(component.transactions).toEqual(testTransactions);

		// Accept
		component.delete(component.transactions[0]);
		component.dialogRef.close(true);
		fixture.detectChanges();
		flush();
		expect(component.transactions).toEqual(testTransactions.splice(0, 1));
	}));

});

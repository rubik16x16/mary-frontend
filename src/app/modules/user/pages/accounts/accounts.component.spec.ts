import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';

import { AccountsComponent } from './accounts.component';
import { MaterialModule } from '../../../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountService } from '../../../../services/account.service';
import { Observable, of } from 'rxjs';
import { Account } from '../../../../models/Account';
import { InputMaskComponent } from 'src/app/components/input-mask/input-mask.component';
import { CommonModule } from '@angular/common';

let testAccountsData: any[] = [
	{
		id: 1,
		name: 'Test',
		amount: 500
	}
];

let mockAccountService: Partial<AccountService> = {

	all(): Observable<Account[]> {

		return of(testAccountsData.map(item => {

			return new Account(item);
		}));
	},
	create(account: Account): Observable<Account> {

		return of(account);
	},
	update(id, newData): Observable<Account> {

		return of(new Account(newData));
	},
	delete(pk): Observable<any> {

		return of(true);
	}
};

describe('Accounts page', () => {

	let component: AccountsComponent;
	let fixture: ComponentFixture<AccountsComponent>;
	let testAccounts: Account[];

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ AccountsComponent, InputMaskComponent ],
			imports: [
				CommonModule,
				ReactiveFormsModule,
				FormsModule,
				MaterialModule,
				BrowserAnimationsModule
			],
			providers: [
				{provide: AccountService, useValue: mockAccountService}
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {

		testAccounts = [...testAccountsData].map(item => {

			return new Account(item);
		});

		fixture = TestBed.createComponent(AccountsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {

		expect(component.accounts).toEqual(testAccounts);
	});

	it('should create new account', fakeAsync(() => {

		component.openCreateModal();
		expect(component.dialogRef.getState()).toBe(0);

		component.dialogRef.close(testAccountsData[0]);
		fixture.detectChanges();
		expect(component.dialogRef.getState()).toBe(1);
		flush();

		testAccounts.push(new Account(testAccountsData[0]));

		expect(component.accounts).not.toBe(testAccounts);
		expect(component.accounts).toEqual(testAccounts);
	}));

	it('should edit account', fakeAsync(() => {

		let editAccount = testAccounts[0].clone();
		component.openEditModal(editAccount);
		expect(component.dialogRef.getState()).toBe(0);
		editAccount.name = 'Test acocunt edited';
		component.dialogRef.close(editAccount.toJSON());
		fixture.detectChanges();
		expect(component.dialogRef.getState()).toBe(1);
		flush();

		testAccounts.splice(0, 1, editAccount);
		expect(component.accounts).not.toBe(testAccounts);
		expect(component.accounts).toEqual(testAccounts);
	}));

	it('should delete account', fakeAsync(() => {

		let account = testAccounts[0].clone();

		// Cancel
		component.delete(account);
		expect(component.dialogRef.getState()).toBe(0);
		component.dialogRef.close();
		fixture.detectChanges();
		expect(component.dialogRef.getState()).toBe(1);
		flush();
		expect(component.accounts).toEqual(testAccounts);

		// Accept
		component.delete(account);
		expect(component.dialogRef.getState()).toBe(0);
		component.dialogRef.close(true);
		fixture.detectChanges();
		expect(component.dialogRef.getState()).toBe(1);
		flush();
		expect(component.accounts).toEqual([]);
	}));
});

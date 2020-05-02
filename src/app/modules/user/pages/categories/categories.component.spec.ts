import { CategoriesComponent } from './categories.component'
import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { TransactionCategoriesService } from 'src/app/services/transaction-categories.service';

import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Category } from 'src/app/models/transaction/Category';

const CATEGORIES_TEST_DATA: any[] = [
	{
		id: 1,
		name: 'Category 1'
	},
	{
		id: 2,
		name: 'Category 2'
	},
];

let mockTransactionCategoriesService: Partial<TransactionCategoriesService> = {

	all(): Observable<any> {

		return of({
			items: CATEGORIES_TEST_DATA.map(item => new Category(item)),
			numPages: 1
		});
	},
	create(category: Category): Observable<any> {

		return of({
			item: category,
			numPages: 1
		});
	},
	update(id, newData: Category): Observable<Category> {

		return of(newData);
	},
	delete(pk): Observable<any> {

		return of({
			items: CATEGORIES_TEST_DATA.splice(0, 1).map(item => new Category(item)),
			numPages: 1
		});
	}
};

describe('Categories page', () => {

	let component: CategoriesComponent;
	let fixture: ComponentFixture<CategoriesComponent>;
	let testCategories: Category[] = []

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ CategoriesComponent ],
			imports: [
				CommonModule,
				ReactiveFormsModule,
				FormsModule,
				MaterialModule,
				BrowserAnimationsModule
			],
			providers: [
				{provide: TransactionCategoriesService, useValue: mockTransactionCategoriesService}
			]
		})
		.compileComponents();

		fixture = TestBed.createComponent(CategoriesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		testCategories = CATEGORIES_TEST_DATA.map(item => new Category(item));
	}));

	it('should create', fakeAsync(() => {

		expect(component).toBeTruthy();
		flush();
		expect(component.categories).toEqual(testCategories);
	}));

	it('should create a new transaction', fakeAsync(() => {

		component.create();
		expect(component.dialogRef.getState()).toBe(0);
		component.dialogRef.close(CATEGORIES_TEST_DATA[0]);
		fixture.detectChanges();
		expect(component.dialogRef.getState()).toBe(1);
		flush();
		testCategories.push(new Category(CATEGORIES_TEST_DATA[0]));
		expect(component.categories).toEqual(testCategories);
	}));

	it('should edit categories', fakeAsync(() => {

		let categoryEdit = CATEGORIES_TEST_DATA[0];

		component.edit(component.categories[0]);
		expect(component.dialogRef.getState()).toBe(0);
		categoryEdit.description = 'Test x';
		component.dialogRef.close(categoryEdit);
		fixture.detectChanges();
		expect(component.dialogRef.getState()).toBe(1);
		flush();
		testCategories.splice(0, 1, new Category(categoryEdit));
		expect(component.categories).toEqual(testCategories);
	}));

	it('should delete a transaction', fakeAsync(() => {

		// Cancel
		component.delete(component.categories[0]);
		component.dialogRef.close();
		fixture.detectChanges();
		flush();
		expect(component.categories).toEqual(testCategories);

		// Accept
		component.delete(component.categories[0]);
		component.dialogRef.close(true);
		fixture.detectChanges();
		flush();
		expect(component.categories).toEqual(testCategories.splice(0, 1));
	}));
});

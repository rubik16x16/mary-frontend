import { EditModalComponent } from './edit-modal.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRefMock } from 'src/app/test-tools/mat-dialog-ref-mock';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

let dialogRef = new MatDialogRefMock();
let data = {
	transaction: {
		id: 1,
		description: 'test',
		amount: 350
	}
};

describe('Transactions edit modal', () => {
	let component: EditModalComponent;
	let fixture: ComponentFixture<EditModalComponent>;


	beforeEach(async(() => {

		TestBed.configureTestingModule({
			declarations: [
				EditModalComponent
			],
			imports: [
				ReactiveFormsModule,
				FormsModule,
				MaterialModule,
				BrowserAnimationsModule,
			],
			providers: [
				{
					provide: MatDialogRef, useValue: dialogRef
				},
				{
					provide: MAT_DIALOG_DATA, useValue: data
				}
			]
		});

		fixture = TestBed.createComponent(EditModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {

		expect(component).toBeTruthy();
		expect(component.form.value).toEqual({description: data.transaction.description});
		expect(component.amount.value).toEqual(data.transaction.amount);
	});

	it('should change amount', () => {

		component.changeAmount(0);
		expect(component.amount.errors).toEqual({required: true});
		component.changeAmount(null);
		expect(component.amount.errors).toEqual({required: true});
		component.changeAmount(200);
		expect(component.amount.value).toBe(200);
		expect(component.amount.errors).toEqual({required: false});
	});

	it('should save be validated', () => {

		component.changeAmount(0);
		component.save();
		expect(component.amount.errors).toEqual({required: true});
		expect(dialogRef.getStatus()).toBe(0);

		component.changeAmount(200);
		component.save();
		expect(dialogRef.getStatus()).toBe(1);
	});

});

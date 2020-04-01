import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditModalComponent } from './edit-modal.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRefMock } from 'src/app/test-tools/mat-dialog-ref-mock';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

let dialogRef = new MatDialogRefMock();
let data = {
	account: {
		id: 1,
		name: 'test',
		amount: 350
	}
};

describe('Accounts edit modal', () => {
	let component: EditModalComponent;
	let fixture: ComponentFixture<EditModalComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ EditModalComponent ],
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
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EditModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {

		expect(component).toBeTruthy();

		expect(component.newAccountForm.value).toEqual({name: 'test'});
		expect(component.amount.value).toEqual(350);
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
		component.newAccountForm.setValue({
			name: 'test'
		});

		component.save();
		expect(dialogRef.getStatus()).toBe(1);
	});
});

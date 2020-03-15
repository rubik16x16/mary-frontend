import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateModalComponent } from './create-modal.component';
import { MaterialModule } from '../../../../../material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRefMock } from '../mat-dialog-ref-mock';

let dialogRef = new MatDialogRefMock();
let data = {};

describe('CreateModalComponent', () => {
	let component: CreateModalComponent;
	let fixture: ComponentFixture<CreateModalComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ CreateModalComponent ],
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
		fixture = TestBed.createComponent(CreateModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {

		expect(component).toBeTruthy();
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

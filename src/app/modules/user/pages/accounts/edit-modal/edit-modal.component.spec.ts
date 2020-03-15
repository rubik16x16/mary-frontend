import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditModalComponent } from './edit-modal.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRefMock } from '../mat-dialog-ref-mock';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

let dialogRef = new MatDialogRefMock();
let data = {
	account: {
		id: 1,
		name: 'test',
		amount: '350'
	}
};

describe('EditModalComponent', () => {
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
	});
});

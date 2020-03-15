import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateModalComponent } from './create-modal.component';
import { MaterialModule } from '../../../../../material.module';
import { MatDialogRefMock } from '../../../components/dialog/dialog.component.spec';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
});

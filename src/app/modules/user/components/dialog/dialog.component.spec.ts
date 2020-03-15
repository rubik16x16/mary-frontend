import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { MaterialModule } from '../../../../material.module';
import { Observable, of } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export class MatDialogRefMock {

	afterClosed(): Observable<any> {

		return of([
			{
				name: 'test',
				amount: 500
			}
		]);
	}
}

let dialogRef = new MatDialogRefMock();
let data = {
	msg: 'Hola mundo'
};

describe('DialogComponent', () => {
	let component: DialogComponent;
	let fixture: ComponentFixture<DialogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ DialogComponent ],
			imports: [
				MaterialModule
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
		fixture = TestBed.createComponent(DialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

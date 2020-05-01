import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-edit-modal',
	templateUrl: './edit-modal.component.html',
	styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

	form = this.fb.group({
		name: ['', Validators.required]
	});

	constructor(

		private dialogRef: MatDialogRef<EditModalComponent>,
		private fb: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	ngOnInit(): void {

		this.form.patchValue({
			name: this.data.category.name
		});
	}

	save(): void {

		if (this.form.valid) {

			this.dialogRef.close(this.form.value);
		}
	}

	close(): void {

		this.dialogRef.close();
	}
}

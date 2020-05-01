import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-create-modal',
	templateUrl: './create-modal.component.html',
	styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent implements OnInit {

	form = this.fb.group({
		name: ['', Validators.required]
	});

	constructor(
		private dialogRef: MatDialogRef<CreateModalComponent>,
		private fb: FormBuilder
	) { }

	ngOnInit(): void {
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

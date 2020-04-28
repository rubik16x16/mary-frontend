import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { TransType } from 'src/app/models/Transaction';

@Component({
	selector: 'app-edit-modal',
	templateUrl: './edit-modal.component.html',
	styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

	form = this.fb.group({
		description: ['', Validators.required],
	});

	amount: any = {
		value: null,
		errors: {
			required: false
		}
	};

	transType = TransType;

	constructor(
		public dialogRef: MatDialogRef<EditModalComponent>,
		private fb: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	ngOnInit(): void {

		this.form.patchValue({
			description: this.data.transaction.description
		});
		this.amount.value = this.data.transaction.amount;
	}

	changeAmount(amount: number) {

		this.amount.value = amount;
		if (this.amount.value === 0 || this.amount.value === null) {

			this.amount.errors.required = true;
		} else {

			this.amount.errors.required = false;
		}
	}

	close() {

		this.dialogRef.close();
	}

	save() {

		if (this.amount.value === 0 || this.amount.value === null) {

			this.amount.errors.required = true;
		}

		if (this.form.valid && !this.amount.errors.required) {

			this.dialogRef.close({
				...this.form.value,
				amount: this.amount.value,
				transType: this.data.transaction.transType
			});
		}
	}

}

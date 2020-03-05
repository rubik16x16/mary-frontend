import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-edit-modal',
	templateUrl: './edit-modal.component.html',
	styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

	newAccountForm = this.fb.group({
		name: ['', Validators.required],
	});

	amount: any = {
		value: null,
		errors: {
			required: false
		}
	};

	constructor(
		public dialogRef: MatDialogRef<EditModalComponent>,
		private fb: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit(): void {

		this.newAccountForm.patchValue({});
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

		if (this.newAccountForm.valid && !this.amount.errors.required) {

			this.dialogRef.close({
				...this.newAccountForm.value,
				amount: this.amount.value
			});
		}
	}

}

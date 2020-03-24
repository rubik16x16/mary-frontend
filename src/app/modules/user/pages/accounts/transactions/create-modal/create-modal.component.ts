import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-create-modal',
	templateUrl: './create-modal.component.html',
	styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent implements OnInit {

	newTransactionForm = this.fb.group({
		description: ['', Validators.required],
	});

	amount: any = {
		value: null,
		errors: {
			required: false
		}
	};

	constructor(
		private dialogRef: MatDialogRef<CreateModalComponent>,
		private fb: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	ngOnInit(): void {
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

		if (this.newTransactionForm.valid && !this.amount.errors.required) {

			this.dialogRef.close({
				...this.newTransactionForm.value,
				amount: this.amount.value
			});
		}
	}

}

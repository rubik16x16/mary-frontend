import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../../services/account.service';
import { Account } from '../../../../models/Account';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateModalComponent } from './create-modal/create-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
	selector: 'app-accounts',
	templateUrl: './accounts.component.html',
	styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

	accounts: Account[];
	dataSource: Account[];
	displayedColumns: string[] = [
		'id', 'name', 'amount', 'actions'
	];

	dialogRef: MatDialogRef<any>;

	loadBar: boolean;

	constructor(
		private accountService: AccountService,
		public dialog: MatDialog
	) { }

	ngOnInit() {

		this.accountService.all().subscribe(res => {

			this.accounts = res;
			this.dataSource = [...this.accounts];
		});
	}

	openCreateModal(): void {
		this.dialogRef = this.dialog.open(CreateModalComponent, {
			width: '450px'
		});

		this.dialogRef.afterClosed().subscribe(result => {
			if (result) {

				this.createNewAccount(result);
			}
		});
	}

	createNewAccount(data): void {

		this.accountService.create(new Account(data)).subscribe(res => {

			this.accounts.push(res);
			this.dataSource = [...this.accounts];
		});
	}

	delete(account: Account): void {

		this.dialogRef = this.dialog.open(DialogComponent, {
			width: '250px',
			data: {msg: `Surely you want to delete account ${account.name}`}
		});

		this.dialogRef.afterClosed().subscribe(result => {

			if (result) {

				let accountIndex = this.accounts.indexOf(account);
				this.accountService.delete(account.id).subscribe(res => {

					this.accounts.splice(accountIndex, 1);
					this.dataSource = [...this.accounts];
				});
			}
		});
	}

	openEditModal(account: Account): void {

		this.dialogRef = this.dialog.open(EditModalComponent, {
			width: '450px',
			data: {
				account
			}
		});

		this.dialogRef.afterClosed().subscribe(result => {
			if (result) {

				this.updateAccount(account, result);
			}
		});
	}

	updateAccount(account, newData): void {

		let accountIndex = this.accounts.indexOf(account);
		this.accountService.update(account.id, newData).subscribe(res => {

			this.accounts.splice(accountIndex, 1, res);
			this.dataSource = [...this.accounts];
		});
	}
}

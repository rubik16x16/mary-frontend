import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../../services/account.service';
import { Account } from '../../../../models/Account';
import { MatDialog } from '@angular/material/dialog';
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

	loadBar: boolean;

	constructor(
		private accountService: AccountService,
		public createModal: MatDialog,
		public editModal: MatDialog,
		public dialog: MatDialog
	) { }

	ngOnInit() {

		this.accountService.all().subscribe(res => {

			this.accounts = res;
			this.dataSource = [...this.accounts];
			console.log(this.accounts);
		});
	}

	openCreateModal(): void {
		const dialogRef = this.createModal.open(CreateModalComponent, {
			width: '450px'
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {

				this.accountService.create(new Account(result)).subscribe(res => {

					this.accounts.push(res);
					this.dataSource = [...this.accounts];
				});
			}
		});
	}

	delete(account): void {

		const dialogRef = this.dialog.open(DialogComponent, {
			width: '250px',
			data: {msg: `Surely you want to delete account ${account.name}`}
		});

		dialogRef.afterClosed().subscribe(result => {

			if (result) {

				let accountIndex = this.accounts.indexOf(account);
				this.accountService.delete(account.id).subscribe(res => {

					this.accounts.splice(accountIndex, 1);
					this.dataSource = [...this.accounts];
				});
			}
		});
	}

	edit(account): void {

		const dialogRef = this.editModal.open(EditModalComponent, {
			width: '450px',
			data: {
				account
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {

				let accountIndex = this.accounts.indexOf(account);
				this.accountService.update(account.id, result).subscribe(res => {

					this.accounts.splice(accountIndex, 1, res);
					this.dataSource = [...this.accounts];
				});
			}
		});
	}
}

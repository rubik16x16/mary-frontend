import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction, TransType } from 'src/app/models/Transaction';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateModalComponent } from './create-modal/create-modal.component';
import { DialogComponent } from '../../../components/dialog/dialog.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { Account } from 'src/app/models/Account';

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

	transType: any = TransType;
	dataSource: Transaction[];
	transactions: Transaction[];
	displayedColumns: string[] = [
		'id', 'description', 'amount', 'createdAt', 'updatedAt', 'actions'
	];
	account: Account;
	pages: any[] = [];
	page: number = 1;
	numPages: number;
	dialogRef: MatDialogRef<any>;

	constructor(
		private transactionsService: TransactionService,
		private route: ActivatedRoute,
		public dialog: MatDialog
	) { }

	ngOnInit(): void {

		this.route.data.subscribe(res => {

			let data = res.data;
			this.account = data.account;
			this.transactions = data.transactions.items;
			this.numPages = data.transactions.numPages;
			this.refreshData();
		});
	}

	refreshData() {

		this.pages = [];
		for (let i = 1; i <= this.numPages; i++) {

			this.pages.push({
				index: i,
				active: i === this.page ? true : false
			});
		}

		this.dataSource = [...this.transactions];
	}

	getTransactions(page): void {

		this.transactionsService.all(this.account.id, page).subscribe(res => {

			this.transactions = res.items;
			this.page = page;
			this.numPages = res.numPages;
			this.refreshData();
		});
	}

	create(transType): void {

		this.dialogRef = this.dialog.open(CreateModalComponent, {
			width: '450px',
			data: { transType }
		});

		this.dialogRef.afterClosed().subscribe(result => {

			if (result) {

				this.transactionsService.create(this.account.id, new Transaction(result)).subscribe(res => {

					if (this.page === 1) {

						if (this.transactions.length === this.transactionsService.recordsPerPage) {

							this.transactions.pop();
						}
						this.transactions.unshift(res.item);
						this.numPages = res.numPages;
						this.refreshData();
					} else {

						this.getTransactions(1);
					}
				});
			}
		});
	}

	edit(transaction: Transaction): void {

		this.dialogRef = this.dialog.open(EditModalComponent, {
			width: '450px',
			data: {
				transaction
			}
		});

		this.dialogRef.afterClosed().subscribe(result => {
			if (result) {

				let transactionIndex = this.transactions.indexOf(transaction);

				this.transactionsService.update(transaction.id, new Transaction(result)).subscribe(res => {

					this.transactions.splice(transactionIndex, 1, res);
					this.dataSource = [...this.transactions];
				});
			}
		});
	}

	delete(transaction: Transaction): void {

		this.dialogRef = this.dialog.open(DialogComponent, {
			width: '250px',
			data: {
				title: 'Delete transaction',
				msg: `Surely you want to delete transaction ${transaction.id}`
			}
		});

		this.dialogRef.afterClosed().subscribe(result => {

			if (result) {

				this.transactionsService.delete(transaction.id, this.page).subscribe(res => {

					this.numPages = res.numPages;

					if (res.items.length > 0) {

						this.transactions = res.items;
						this.refreshData();
						return;
					}

					if (this.page > 1) {

						this.getTransactions(this.page - 1);
						return;
					}

					this.transactions = [];
					this.refreshData();
				});
			}
		});
	}
}

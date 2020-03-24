import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../../../services/transaction.service';
import { Transaction } from 'src/app/models/Transaction';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateModalComponent } from './create-modal/create-modal.component';
import { DialogComponent } from '../../../components/dialog/dialog.component';

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

	dataSource: Transaction[];
	transactions: Transaction[];
	displayedColumns: string[] = [
		'id', 'description', 'amount', 'actions'
	];
	accountId: number;
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

		this.accountId = +this.route.snapshot.paramMap.get('id');
		this.get_transactions();
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

	get_transactions(page= 1): void {

		this.transactionsService.all(this.accountId, page).subscribe(res => {

			this.transactions = res.items;
			this.page = page;
			this.numPages = res.numPages;
			this.refreshData();
		});
	}

	create(): void {

		this.dialogRef = this.dialog.open(CreateModalComponent, {
			width: '450'
		});

		this.dialogRef.afterClosed().subscribe(result => {

			if (result) {

				this.transactionsService.create(this.accountId, result).subscribe(res => {

					if (this.page === 1) {

						this.transactions.pop();
						this.transactions.unshift(res.item);
					}
					this.numPages = res.numPages;
					this.refreshData();
				});
			}
		});
	}

	delete(transaction: Transaction): void {

		this.dialogRef = this.dialog.open(DialogComponent, {
			width: '250px',
			data: {
				msg: `Surely you want to delete account ${transaction.id}`
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

						this.get_transactions(this.page - 1);
						return;
					}

					this.transactions = [];
					this.refreshData();
				});
			}
		});
	}
}

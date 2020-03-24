import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../../../services/transaction.service';
import { Transaction } from 'src/app/models/Transaction';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateModalComponent } from './create-modal/create-modal.component';

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
			this.numPages = res.num_pages;
			this.refreshData();
		});
	}

	createNewTransaction(): void {

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
					this.numPages = res.num_pages;
					this.refreshData();
				});
			}
		});
	}
}

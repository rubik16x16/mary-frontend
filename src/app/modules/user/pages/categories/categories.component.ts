import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/transaction/Category';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { TransactionCategoriesService } from '../../../../services/transaction-categories.service';
import { DataTable } from '../../../../tools/DataTable';
import { CreateModalComponent } from './create-modal/create-modal.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends DataTable implements OnInit {

	categories: Category[];

	displayedColumns: string[] = [
		'id', 'name', 'actions'
	];

	dialogRef: MatDialogRef<any>;

	constructor(
		private categoriesService: TransactionCategoriesService,
		private dialog: MatDialog
	) {

		super();
	}

	ngOnInit(): void {

		this.categoriesService.all().subscribe(res => {

			this.categories = res.items;
			this.numPages = res.numPages;
			this.refreshData(this.categories);
		});
	}

	getCategories(page): void {

		this.categoriesService.all(page).subscribe(res => {

			this.categories = res.items;
			this.page = page;
			this.numPages = res.numPages;
			this.refreshData(this.categories);
		});
	}

	create(): void {

		this.dialogRef = this.dialog.open(CreateModalComponent, {
			width: '450px',
			data: null
		});

		this.dialogRef.afterClosed().subscribe(result => {

			if (result) {

				this.categoriesService.create(new Category(result)).subscribe(res => {

					this.numPages = res.numPages;
					if (this.page === this.numPages && this.numPages > 1) {

						if (this.categories.length !== this.categoriesService.RECORDS_PER_PAGE) {

							this.categories.push(res.item);
						}
					}

					this.refreshData(this.categories);
				});
			}
		});
	}

	edit(category: Category): void {

		this.dialogRef = this.dialog.open(EditModalComponent, {
			width: '450px',
			data: {
				category
			}
		});

		this.dialogRef.afterClosed().subscribe(result => {
			if (result) {

				let transactionIndex = this.categories.indexOf(category);

				this.categoriesService.update(category.id, new Category(result)).subscribe(res => {

					this.categories.splice(transactionIndex, 1, res);
					this.dataSource = [...this.categories];
				});
			}
		});
	}

	delete(category: Category): void {

		this.dialogRef = this.dialog.open(DialogComponent, {
			width: '250px',
			data: {
				title: 'Delete category',
				msg: `Surely you want to delete category ${category.id}`
			}
		});

		this.dialogRef.afterClosed().subscribe(result => {

			if (result) {

				this.categoriesService.delete(category.id, this.page).subscribe(res => {

					this.numPages = res.numPages;

					if (res.items.length > 0) {

						this.categories = res.items;
						this.refreshData(this.categories);
						return;
					}

					if (this.page > 1) {

						this.getCategories(this.page - 1);
						return;
					}

					this.categories = [];
					this.refreshData(this.categories);
				});
			}
		});
	}
}

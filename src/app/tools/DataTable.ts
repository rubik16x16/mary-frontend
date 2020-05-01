export class DataTable {

	dataSource: any[];

	pages: any[] = [];
	page: number = 1;
	numPages: number;

	refreshData(newDataSource) {

		this.pages = [];
		for (let i = 1; i <= this.numPages; i++) {

			this.pages.push({
				index: i,
				active: i === this.page ? true : false
			});
		}

		this.dataSource = [...newDataSource];
	}
}

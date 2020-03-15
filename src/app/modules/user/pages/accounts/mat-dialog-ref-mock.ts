import { Observable, of } from 'rxjs';

export class MatDialogRefMock {

	afterClosed(): Observable<any> {

		return of([
			{
				name: 'test',
				amount: 500
			}
		]);
	}
}

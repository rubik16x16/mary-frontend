import { Observable, of } from 'rxjs';

export class MatDialogRefMock {

	// tslint:disable-next-line: variable-name
	private _status: number = 0;

	getStatus() {

		return this._status;
	}

	close(value: any) {

		this._status = 1;
		return value;
	}
}

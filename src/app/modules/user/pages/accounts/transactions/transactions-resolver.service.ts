import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class TransactionsResolverService implements Resolve<any>{

	constructor(
		private accountService: AccountService,
		private transactionsService: TransactionService,
		private router: Router
	) { }

	resolve(route: ActivatedRouteSnapshot): Observable<any> {

		let id = +route.paramMap.get('id');
		let observables = [
			this.accountService.get(id),
			this.transactionsService.all(id, 1)
		];

		return forkJoin(observables).pipe(map(res => {

			return {
				account: res[0],
				transactions: res[1]
			};
		}));
	}
}

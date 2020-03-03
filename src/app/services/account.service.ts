import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Account } from '../models/Account';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public static API_URL: string = `${environment.apiUrl}/user/accounts`;

  constructor(
    private httpClient: HttpClient
  ) { }

  get(pk): Observable<Account> {

    let apiUrl = `${AccountService.API_URL}/${pk}`;
    return this.httpClient.get<Account>(apiUrl)
    .pipe(
      map((data: any) => new Account(data)),
      catchError(this.handleError)
    );
  }

  all(): Observable<Account[]> {

    return this.httpClient.get<Account[]>(AccountService.API_URL).
    pipe(
      map((data: any) => data.map((item: any) => new Account(item)))
    );
  }

  create(account: Account): Observable<Account> {

    return this.httpClient.post<Account[]>(AccountService.API_URL, account).
    pipe(
      map((data: any) => new Account(data))
    );
  }

  update(pk, newData): Observable<Account> {

    let apiUrl = `${AccountService.API_URL}/${pk}`;
    return this.httpClient.put<Account>(apiUrl, newData).
    pipe(
      map((data: any) => new Account(data))
    );
  }

  delete(pk): Observable<any> {

    let apiUrl = `${AccountService.API_URL}/${pk}`;
    return this.httpClient.delete<any>(apiUrl);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}

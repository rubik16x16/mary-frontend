import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/Account';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private static API_URL: string = `${environment.apiUrl}/transacciones`;

  constructor(
    private httpClient: HttpClient
  ) { }

  get(): Observable<Account> {

    return this.httpClient.get<Account>(AccountService.API_URL)
    .pipe(
      map((data: any) => new Account(data))
    );
  }

  test(): string {

    return 'Hola mundo';
  }
}

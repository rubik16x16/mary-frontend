import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginRoute = 'http://127.0.0.1:8000/api/token/';

  constructor(
    private httpClient: HttpClient
  ) { }

  login(credenciales: any): Observable<any> {

    return this.httpClient.post(this.loginRoute, credenciales, {observe: 'response'}).pipe(
      catchError(this.handleError<any>())
    );
  }// end login

  logOut(): void {

    localStorage.removeItem('user');
  }// end logOut

  isLogin(): boolean {

    return localStorage.getItem('user') != null;
  }// end isLogin

  getToken(): any {

    return JSON.parse(localStorage.getItem('user'));
  }// end getToken

  private handleError<T>() {
    return (error: any): Observable<T> => {

      // Let the app keep running by returning an empty result.
      return of(error as T);
    };
  }// end handleError
}

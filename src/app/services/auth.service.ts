import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public static LOGIN_API_URL = `${environment.apiUrl}/api/token/`;

  constructor(
    private httpClient: HttpClient
  ) { }

  login(credenciales: any): Observable<any> {

    return this.httpClient.post(AuthService.LOGIN_API_URL, credenciales, {observe: 'response'}).pipe(
      catchError(this.handleError<any>())
    );
  }// end login

  logOut(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }// end logOut

  isLogin(): boolean {

    return localStorage.getItem('token') != null;
  }// end isLogin

  getToken(): any {

    return JSON.parse(localStorage.getItem('token'));
  }// end getToken

  private handleError<T>() {
    return (error: any): Observable<T> => {

      // Let the app keep running by returning an empty result.
      return of(error as T);
    };
  }// end handleError

  getUserPermissions(): string[] {

    let user = JSON.parse(localStorage.getItem('user'));
    let permissions = [];

    user.permissions.forEach(permission => {

      permission = permission.split('|');
      let strPermision = permission[0].substring(0, permission[0].length - 1) + '.' + permission[2].trim();
      strPermision = strPermision.split(' ').join('-');
      permissions.push(strPermision.toLowerCase());
    });

    return permissions;
  }
}

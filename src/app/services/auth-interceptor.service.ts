import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

      const token = this.authService.getToken();
      let request = req;

      if (token) {
        request = req.clone({
          setHeaders: {
            authorization: `Bearer ${ token.access }`
          }
        });
      }

      return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) => {

          if (err.status === 401) {

            this.authService.logOut();
            this.router.navigateByUrl('/login');
          }

          return throwError( err );

        })
      );
  }
}

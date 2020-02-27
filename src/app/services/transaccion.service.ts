import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaccion } from '../models/Transaccion';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  private url: string = `${environment.apiUrl}/transacciones`;

  constructor(
    private httpClient: HttpClient
  ) { }

  all(): Observable<Transaccion[]> {

    return this.httpClient.get<Transaccion[]>(this.url)
      .pipe(
        map((data: any[]) =>
          data.map(
            (item: any) =>
              new Transaccion(item.id, item.descripcion, item.monto)
          )
        )
      );
  }
}

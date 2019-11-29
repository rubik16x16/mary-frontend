import { Component, OnInit } from '@angular/core';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { Transaccion } from 'src/app/models/Transaccion';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss']
})
export class TransaccionesComponent implements OnInit {

  displayedColumns: string[] = ['indice', 'descripcion', 'monto'];
  transacciones: Transaccion[];

  constructor(
    private transaccionService: TransaccionService
  ) { }

  ngOnInit() {

    this.transaccionService.all().subscribe(res => {

      this.transacciones = res;
    });
  }

}

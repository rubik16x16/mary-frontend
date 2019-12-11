import { Component, OnInit, Inject } from '@angular/core';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { Transaccion } from 'src/app/models/Transaccion';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from './create/create.component';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss']
})
export class TransaccionesComponent implements OnInit {

  displayedColumns: string[] = ['indice', 'descripcion', 'monto'];
  transacciones: Transaccion[];

  constructor(
    private transaccionService: TransaccionService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    this.transaccionService.all().subscribe(res => {

      this.transacciones = res;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '500px',
      data: {name: 'test', animal: 'test2'}
    });
  }
}

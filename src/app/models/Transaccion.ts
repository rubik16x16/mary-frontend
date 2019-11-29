import { Usuario } from './Usuario';

export class Transaccion {

  // tslint:disable-next-line: variable-name
  private _id: number;
  // tslint:disable-next-line: variable-name
  private _monto: number;
  // tslint:disable-next-line: variable-name
  private _descripcion: string;
  // tslint:disable-next-line: variable-name
  private _usuario: Usuario;

  constructor(
    id?: number,
    descripcion?: string,
    monto?: number,
    usuario?: Usuario
  ) {

    this.id = id;
    this.descripcion = descripcion;
    this.monto = monto;
    this.usuario = usuario;
  }

  get id(): number {

    return this._id;
  }

  set id(id: number) {

    this._id = id;
  }

  get descripcion(): string {

    return this._descripcion;
  }

  set descripcion(descripcion: string) {

    this._descripcion = descripcion;
  }

  get monto(): number {

    return this._monto;
  }

  set monto(monto: number) {

    this._monto = monto;
  }

  get usuario(): Usuario {

    return this._usuario;
  }

  set usuario(usuario: Usuario) {

    this._usuario = usuario;
  }

  test() {

    console.log('test');
  }
}

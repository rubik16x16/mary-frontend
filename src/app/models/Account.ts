import { Usuario } from './Usuario';
import { Transaccion } from './Transaccion';
import { Model } from './Model';
export class Account extends Model {

  // tslint:disable-next-line: variable-name
  private _id: number;
  // tslint:disable-next-line: variable-name
  private _name: string;
  // tslint:disable-next-line: variable-name
  private _amount: number;
  // tslint:disable-next-line: variable-name
  private _user: string;
  // tslint:disable-next-line: variable-name
  transactions: Transaccion[];

  protected fillable = ['id', 'name', 'amount', 'user', 'transactions'];

  constructor(
    object: any = {}
  ) {

    super();
    this.fill(object);
  }

  get id(): number {

    return this._id;
  }

  set id(id: number) {

    this._id = id;
  }

  get name(): string {

    return this._name;
  }

  set name(name: string) {

    this._name = name;
  }

  get amount(): number {

    return this._amount;
  }

  set amount(amount: number) {

    this._amount = amount;
  }

  get user(): string {

    return this._user;
  }

  set user(user: string) {

    this._user = user;
  }

  toJSON(): any {

    return {
      id: this.id,
      name: this.name,
      amount: this.amount,
      user: this.user,
      transactions: this.transactions
    };
  }
}

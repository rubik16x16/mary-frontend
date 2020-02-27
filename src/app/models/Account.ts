import { Usuario } from './Usuario';
import { Transaccion } from './Transaccion';
import { Model } from './Model';
export class Account extends Model {

  // tslint:disable-next-line: variable-name
  private _id: number;
  // tslint:disable-next-line: variable-name
  private _user: string;
  // tslint:disable-next-line: variable-name
  private _amount: number;
  // tslint:disable-next-line: variable-name
  transactions: Transaccion[];

  protected fillable = ['id', 'user', 'amount', 'transactions'];

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

  get user(): string {

    return this._user;
  }

  set user(user: string) {

    this._user = user;
  }

  get amount(): number {

    return this._amount;
  }

  set amount(amount: number) {

    this._amount = amount;
  }

  toJSON(): any {

    return {
      id: this.id,
      user: this.user,
      amount: this.amount,
      transactions: this.transactions
    };
  }
}

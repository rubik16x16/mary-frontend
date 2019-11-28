export class Usuario {

  // tslint:disable-next-line: variable-name
  private _email: string;

  constructor(
    email: string
  ) {

    this.email = email;
  }

  get email(): string {

    return this._email;
  }

  set email(value: string) {

    this._email = value;
  }
}

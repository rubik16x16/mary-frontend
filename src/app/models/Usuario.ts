class Usuario {

  // tslint:disable-next-line: variable-name
  private _email: string;

  constructor() { }

  get email(): string {

    return this._email;
  }

  set email(value: string) {

    this._email = value;
  }
}

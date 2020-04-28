import { Model } from './Model';

enum TransType {
	INCOME = 'IN',
	EXPENSE = 'EX'
}

class Transaction extends Model {

	// tslint:disable-next-line: variable-name
	private _id: number;
	// tslint:disable-next-line: variable-name
	private _description: string;
	// tslint:disable-next-line: variable-name
	private _amount: number;
	// tslint:disable-next-line: variable-name
	private _transType: TransType;
	// tslint:disable-next-line: variable-name
	private _createdAt: string;
	// tslint:disable-next-line: variable-name
	private _updatedAt: string;

	protected fillable = ['id', 'description', 'amount', 'transType', 'createdAt', 'updatedAt'];

	constructor(object: any) {

		super();
		this.fill(object);
	}

	get id(): number {

		return this._id;
	}

	set id(id: number) {

		this._id = id;
	}

	get description(): string {

		return this._description;
	}

	set description(description: string) {

		this._description = description;
	}

	get amount(): number {

		return this._amount;
	}

	set amount(amount: number) {

		this._amount = amount;
	}

	get transType(): TransType {

		return this._transType;
	}

	set transType(transType: TransType) {

		this._transType = transType;
	}

	get createdAt(): string {

		return this._createdAt;
	}

	set createdAt(createdAt: string) {

		this._createdAt = createdAt;
	}

	get updatedAt(): string {

		return this._updatedAt;
	}

	set updatedAt(updatedAt: string) {

		this._updatedAt = updatedAt;
	}

	toJSON(): any {

		return {
			id: this.id,
			description: this.description,
			amount: this.amount,
			trans_type: this.transType
		};
	}
}

export { Transaction, TransType };

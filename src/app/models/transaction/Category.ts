import { Model } from '../Model';

export class Category extends Model {

	// tslint:disable-next-line: variable-name
	private _id: number;
	// tslint:disable-next-line: variable-name
	private _name: string;

	protected fillable = [
		'id', 'name', 'createdAt', 'updatedAt'
	];

	constructor(object: any = null) {

		super();
		if (object != null) {

			this.fill(object);
		}
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

	toJSON(): any {

		return {
			id: this.id,
			name: this.name,
		};
	}
}

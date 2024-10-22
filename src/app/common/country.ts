import {State} from './state';

export class Country {

	private _id: number = 0;
	private _code: string = "";
	private _name: string = "";
	private _states: State[] = [];


	constructor() {
	}


	get id(): number {
		return this._id;
	}

	set id(value: number) {
		this._id = value;
	}

	get code(): string {
		return this._code;
	}

	set code(value: string) {
		this._code = value;
	}

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	get states(): State[] {
		return this._states;
	}

	set states(value: State[]) {
		this._states = value;
	}
}

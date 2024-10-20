export class Product {

	constructor(private _sku: string,
				private _name: string,
				private _description: string,
				private _unitPrice: number,
				private _imageUrl: string,
				private _active: boolean,
				private _unitsInStock: number,
				private _dateCreated: Date,
				private _lastUpdate: Date) {
	}

	// Getters
	get sku(): string {
		return this._sku;
	}

	get name(): string {
		return this._name;
	}

	get description(): string {
		return this._description;
	}

	get unitPrice(): number {
		return this._unitPrice;
	}

	get imageUrl(): string {
		return this._imageUrl;
	}

	get active(): boolean {
		return this._active;
	}

	get unitsInStock(): number {
		return this._unitsInStock;
	}

	get dateCreated(): Date {
		return this._dateCreated;
	}

	get lastUpdate(): Date {
		return this._lastUpdate;
	}
}

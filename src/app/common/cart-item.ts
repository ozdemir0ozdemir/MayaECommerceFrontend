import {Product} from './product';

export class CartItem {

	private readonly _id: number;
	private readonly _name: string;
	private readonly _imageUrl: string;
	private readonly _unitPrice: number;
	private _quantity: number;

	constructor(product: Product) {
		this._id = product.id;
		this._name = product.name;
		this._imageUrl = product.imageUrl;
		this._unitPrice = product.unitPrice;
		this._quantity = 1;
	}


	get id(): number {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get imageUrl(): string {
		return this._imageUrl;
	}

	get unitPrice(): number {
		return this._unitPrice;
	}

	get quantity(): number {
		return this._quantity;
	}


	set quantity(value: number) {
		this._quantity = value;
	}
}

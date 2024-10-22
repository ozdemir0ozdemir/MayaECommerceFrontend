
export class Page {

	private _size: number = 0;
	private _number:number = 0;
	private _totalElements: number = 0;
	private _totalPages: number = 0;

	constructor() {
	}


	// Getters
	get size(): number {
		return this._size;
	}

	get number(): number {
		return this._number;
	}

	get totalElements(): number {
		return this._totalElements;
	}

	get totalPages(): number {
		return this._totalPages;
	}

	isLastPage(): boolean {
		return this._number == this._totalPages;
	}

	hasPreviousPage(): boolean {
		return this._number > 1;
	}

	hasNextPage(): boolean {
		return this._number < this._totalPages;
	}


	set size(value: number) {
		this._size = value;
	}

	set number(value: number) {
		this._number = value;
	}

	set totalElements(value: number) {
		this._totalElements = value;
	}

	set totalPages(value: number) {
		this._totalPages = value;
	}
}

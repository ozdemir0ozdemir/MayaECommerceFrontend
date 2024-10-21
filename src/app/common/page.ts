
export class Page {

	constructor(private _size: number,
				private _number:number,
				private _totalElements: number,
				private _totalPages: number) {
	}


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

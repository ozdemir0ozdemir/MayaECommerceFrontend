export class ProductCategory {

	constructor(private _productCategoryId: number,
				private _categoryName: string) {
	}


	get productCategoryId(): number {
		return this._productCategoryId;
	}

	get categoryName(): string {
		return this._categoryName;
	}
}

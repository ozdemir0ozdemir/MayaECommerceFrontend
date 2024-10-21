import {Product} from './product';
import {Page} from './page';


export class ProductPage {

	constructor(private _content: Product[],
				private _page: Page) {
	}

	static ofDefault(page:number, pageSize: number): ProductPage {
		return new ProductPage([], new Page(pageSize, page, 0, 0));
	}

	get content(): Product[] {
		return this._content;
	}

	get page(): Page {
		return this._page;
	}
}

import {Page} from './page';


export class DataPage<T> {
	private _content: T[] = []
	private _page: Page = new Page();

	constructor() {
	}



	get content(): T[] {
		return this._content;
	}

	get page(): Page {
		return this._page;
	}
}

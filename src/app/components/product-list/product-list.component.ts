import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

	private _productList: Product[] = [];

	constructor(private productService: ProductService) {
	}

	ngOnInit() {
		this.productService.getProductList().subscribe({
			next: (data: Product[]) => this._productList = data,
			error: (error) => console.log(`Error ${JSON.stringify(error)}`),
			complete: () => console.log("Completed"),
		});
	}

	public get productList(): Product[] {
		return this._productList;
	}


}

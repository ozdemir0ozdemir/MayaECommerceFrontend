import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';
import {ActivatedRoute, ParamMap, Route, Router, RouterLink, Routes} from '@angular/router';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

	private _productList: Product[] = [];
	private currentCategoryId?: number | null;

	constructor(private productService: ProductService,
				route: ActivatedRoute) {

		route.paramMap.subscribe({
			next: (paramMap: ParamMap) => {
				if(paramMap.has('productCategoryId') ){
					this.currentCategoryId = <number | null>paramMap.get('productCategoryId');
					if(this.currentCategoryId){
						this.listProductsByCategoryId(this.currentCategoryId);
					}
				}
				else if (paramMap.has('keyword')) {
					this.listProductsByNameContaining(<string>paramMap.get('keyword'))
				}
				else {
					this.listProducts()
				}
			}
		});
	}

	ngOnInit() {
	}

	public get productList(): Product[] {
		return this._productList;
	}

	private listProducts(): void {
		this.productService.getProductList(1, 100).subscribe({
			next: (data: Product[]) => this._productList = data,
			error: (error) => console.log(`Error ${JSON.stringify(error)}`)
		});
	}

	private listProductsByCategoryId(categoryId: number): void {
		this.productService.getProductListByCategoryId(categoryId,1, 100).subscribe({
			next: (data: Product[]) => this._productList = data,
			error: (error) => console.log(`Error ${JSON.stringify(error)}`)
		});
	}

	private listProductsByNameContaining(keyword: string): void {
		this.productService.searchProductByNameContaining(keyword,1, 100).subscribe({
			next: (data: Product[]) => this._productList = data,
			error: (error) => console.log(`Error ${JSON.stringify(error)}`)
		});
	}


}

import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ProductPage} from '../../common/product-page';
import {Page} from '../../common/page';
import {Observer} from 'rxjs';


@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrl: './product-list.component.css'
})
export class ProductListComponent{

	private readonly defaultPage: number = 1;
	private pageSize: number = 10;

	protected productPage: ProductPage = ProductPage.ofDefault(this.defaultPage, this.pageSize);
	private currentCategoryId: number = 1;
	private currentSearchedKeyword: string = "";

	private isCategoryBasedFiltered: boolean = false;
	private isNameSearchBasedFiltered: boolean = false;


	constructor(private productService: ProductService,
				route: ActivatedRoute) {

		route.paramMap.subscribe({
			next: (paramMap: ParamMap) => {
				if (paramMap.has('productCategoryId')) {
					this.currentCategoryId = +<string>paramMap.get('productCategoryId');
					this.listProductsByCategoryId(this.currentCategoryId, this.defaultPage, this.pageSize);
					this.setCategoryBasedFilteredActive();

				} else if (paramMap.has('keyword')) {
					this.currentSearchedKeyword = <string>paramMap.get('keyword');
					this.listProductsByNameContaining(this.currentSearchedKeyword, this.defaultPage, this.pageSize);
					this.setNameSearchBasedFilteredActive();

				} else {
					this.listProducts(this.defaultPage, this.pageSize)
					this.setNoFilterActive();
				}
			}
		});
	}

	protected changePage(page: number): void {
		if (this.isCategoryBasedFiltered) {
			this.listProductsByCategoryId(this.currentCategoryId, page, this.pageSize);

		} else if (this.isNameSearchBasedFiltered) {
			this.listProductsByNameContaining(this.currentSearchedKeyword, page, this.pageSize);

		} else {
			this.listProducts(page, this.pageSize);
		}
	}

	protected updatePageSize(pageSizeSelect: string):void {
		this.pageSize = +pageSizeSelect;
		this.changePage(this.productPage.page.number);
	}

	private listProducts(page: number, size: number): void {
		this.productService.getProductList(page, size)
			.subscribe(this.assignProductPage());
	}

	private listProductsByCategoryId(categoryId: number, page: number, size: number): void {
		this.productService.getProductListByCategoryId(categoryId, page, size)
			.subscribe(this.assignProductPage());
	}

	private listProductsByNameContaining(keyword: string, page: number, size: number): void {
		this.productService.searchProductByNameContaining(keyword, page, size)
			.subscribe(this.assignProductPage());
	}

	private assignProductPage(): Partial<Observer<ProductPage>> {
		return {
			next: (data: ProductPage) => this.productPage = data,
			error: (error) => console.log(`Error ${JSON.stringify(error)}`)
		};
	}

	private setCategoryBasedFilteredActive(): void {
		this.isCategoryBasedFiltered = true;
		this.isNameSearchBasedFiltered = false;
	}

	private setNameSearchBasedFilteredActive(): void {
		this.isCategoryBasedFiltered = false;
		this.isNameSearchBasedFiltered = true;
	}

	private setNoFilterActive(): void {
		this.isCategoryBasedFiltered = false;
		this.isNameSearchBasedFiltered = false;
	}



}

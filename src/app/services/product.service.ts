import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Product} from '../common/product';
import {ProductCategory} from '../common/product-category';

@Injectable({
	providedIn: 'root'
})
export class ProductService {

	private baseUrl: string = "http://localhost:8080/products";

	constructor(private httpClient: HttpClient) {
	}

	getProductList(page: number = 1, size: number = 20): Observable<Product[]> {
		return this.httpClient.get<Product[]>(`${this.baseUrl}?page=${page}&size=${size}`);
	}

	getProductListByCategoryId(productCategoryId: number = 1,
							   page: number = 1,
							   size: number = 20): Observable<Product[]> {
		return this.httpClient.get<Product[]>(`${this.baseUrl}/category/${productCategoryId}?page=${page}&size=${size}`);
	}

	getProductCategories() : Observable<ProductCategory[]> {
		return this.httpClient.get<ProductCategory[]>(`${this.baseUrl}/categories`);
	}

	searchProductByNameContaining(name: string,
								  page: number = 1,
								  size: number = 20) : Observable<Product[]> {
		return this.httpClient.get<Product[]>(`${this.baseUrl}/search?name=${name}&page=${page}&size=${size}`);
	}

}

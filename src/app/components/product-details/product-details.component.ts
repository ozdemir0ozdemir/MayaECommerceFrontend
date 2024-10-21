import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';

@Component({
	selector: 'app-product-details',
	templateUrl: './product-details.component.html',
	styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

	currentProduct?: Product;

	constructor(private productService: ProductService,
				activatedRoute: ActivatedRoute) {

		activatedRoute.paramMap.subscribe({
			next: (paramMap: ParamMap) => {
				if (paramMap.has("productId")) {
					let tempId: number | null = <number | null>paramMap.get("productId");
					if (tempId) {
						this.getProductByProductId(tempId);
					}
				}
			}
		});
	}

	ngOnInit(): void {
	}

	private getProductByProductId(productId: number): void {
		this.productService.getProductByProductId(productId).subscribe({
			next: (product: Product) => this.currentProduct = product,
			error: err => console.log(JSON.stringify(err))
		});
	}


}

import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ProductCategory} from '../../common/product-category';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent implements OnInit{

	productCategories?: ProductCategory[];

	constructor(private productService: ProductService) {
	}

	ngOnInit():void {
		this.productService.getProductCategories().subscribe({
			next: (value: ProductCategory[]) => this.productCategories = value,
			error: err => console.log(JSON.stringify(err))
		})

	}

}

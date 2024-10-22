import { Component } from '@angular/core';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent {

	private _totalPrice: number = 0;
	private _totalQuantity: number = 0;

	constructor(private cartService: CartService) {

		cartService.totalQuantity.subscribe({
			next: (quantity:number) => this._totalQuantity = quantity
		});

		cartService.totalPrice.subscribe({
			next: (price:number) => this._totalPrice = price
		});

	}


	get totalPrice(): number {
		return this._totalPrice;
	}

	get totalQuantity(): number {
		return this._totalQuantity;
	}
}

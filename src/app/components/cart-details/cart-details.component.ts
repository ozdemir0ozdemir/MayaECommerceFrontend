import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../common/cart-item';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit{

	private _totalPrice: number = 0;
	private _totalQuantity: number = 0;

	constructor(private cartService: CartService) {
	}

	ngOnInit():void {
		this.cartService.totalQuantity.subscribe({
			next: (quantity:number) => this._totalQuantity = quantity
		});

		this.cartService.totalPrice.subscribe({
			next: (price:number) => this._totalPrice = price
		});

	}

	protected getCartItems(): CartItem[] {
		return this.cartService.getCartItems();
	}


	protected get totalPrice(): number {
		return this._totalPrice;
	}

	protected get totalQuantity(): number {
		return this._totalQuantity;
	}

	protected incrementQuantity(cartItem: CartItem): void {
		this.cartService.addToCart(cartItem);
	}

	protected decrementQuantity(cartItem: CartItem): void {
		this.cartService.decrementQuantity(cartItem);
	}

	protected removeItem(cartItem: CartItem): void {
		this.cartService.removeFromCart(cartItem);
	}
}

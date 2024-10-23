import {Injectable} from '@angular/core';
import {CartItem} from '../common/cart-item';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CartService {

	private cartItems: CartItem[] = [];

	constructor() {
	}

	totalPrice: Subject<number> = new BehaviorSubject<number>(0);
	totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

	addToCart(cartItem: CartItem): void {

		let existingCartItem: CartItem | undefined = this.cartItems
			.find((item: CartItem) => item.id === cartItem.id);

		if (existingCartItem != undefined) {
			existingCartItem.quantity++;
		} else {
			this.cartItems.push(cartItem);
		}

		this.computeCartTotals();
	}

	decrementQuantity(cartItem: CartItem): void {
		let existingCartItem: CartItem | undefined = this.cartItems
			.find((item: CartItem) => item.id === cartItem.id);

		if (existingCartItem != undefined) {
			existingCartItem.quantity--;

			if(existingCartItem.quantity === 0){
				this.remove(existingCartItem);
			}

			this.computeCartTotals();
		}
	}

	removeFromCart(cartItem: CartItem): void {
		this.remove(cartItem);
	}

	public getCartItems(): CartItem[] {
		this.computeCartTotals();
		return this.cartItems
	}

	private remove(cartItem: CartItem): void {
		const index: number =
			this.cartItems.findIndex(item => item.id == cartItem.id);

		if(index > -1){
			this.cartItems.splice(index, 1)
		}
	}
	private computeCartTotals(): void {

		let price: number = 0, quantity: number = 0;

		for (let item of this.cartItems) {
			price += item.unitPrice * item.quantity;
			quantity += item.quantity;
		}

		this.totalPrice.next(price);
		this.totalQuantity.next(quantity);
	}


}

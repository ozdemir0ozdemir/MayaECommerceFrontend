import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MayaFormService} from '../../services/maya-form.service';
import {CountryService} from '../../services/country.service';
import {Country} from '../../common/country';
import {DataPage} from '../../common/data-page';
import {State} from '../../common/state';
import {MayaValidators} from '../../validators/maya-validators';
import {CartService} from '../../services/cart.service';

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

	checkoutFormGroup: FormGroup;
	billAddressSame: boolean = true;

	creditCardExpirationMonths: number[] = [];
	creditCardExpirationYears: number[] = [];

	countries: Country[] = [];
	shippingStates: State[] = [];
	billingStates: State[] = [];

	totalPrice: number = 0;
	totalQuantity: number = 0;

	constructor(private formBuilder: FormBuilder,
				private mayaFormService: MayaFormService,
				private countryService: CountryService,
				private cartService: CartService) {

		mayaFormService.getCreditCardExpirationYears().subscribe({
			next: (years: number[]) => this.creditCardExpirationYears = years
		});

		mayaFormService.getCreditCardExpirationMonths(new Date().getMonth() + 1).subscribe({
			next: (months: number[]) => this.creditCardExpirationMonths = months
		});

		countryService.getAllCountries().subscribe({
			next: (page: DataPage<Country>) => {
				this.countries = page.content;
				this.checkoutFormGroup.get('shippingAddress.country')?.setValue(page.content[0].code);
				this.checkoutFormGroup.get('billingAddress.country')?.setValue(page.content[0].code);
				this.handleCountryChanges('shipping');
				this.handleCountryChanges('billing');
			}

		});

		this.checkoutFormGroup = this.formBuilder.group({
			customer: this.formBuilder.group({
				firstName: new FormControl([''], [Validators.required, Validators.minLength(2), MayaValidators.notOnlyWhitespace]),
				lastName: new FormControl([''], [Validators.required, Validators.minLength(2), MayaValidators.notOnlyWhitespace]),
				email: new FormControl([''],
					[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
			}),
			shippingAddress: this.formBuilder.group({
				country: new FormControl([''], [Validators.required]),
				street: new FormControl([''], []),
				city: new FormControl([''], []),
				state: new FormControl([''], [Validators.required]),
				zipCode: new FormControl([''], [])
			}),
			addressEquality: this.formBuilder.group({
				equal: true
			}),
			billingAddress: this.formBuilder.group({
				country: new FormControl([''], [Validators.required]),
				street: new FormControl([''], []),
				city: new FormControl([''], []),
				state: new FormControl([''], [Validators.required]),
				zipCode: new FormControl([''], [])
			}),
			creditCard: this.formBuilder.group({
				cardType: new FormControl([''], [Validators.required]),
				nameOnCard: new FormControl([''], [Validators.required, Validators.minLength(2), MayaValidators.notOnlyWhitespace]),
				cardNumber: new FormControl([''], [Validators.required, Validators.pattern('[0-9]{16}')]),
				cvv2Code: new FormControl([''], [Validators.required, Validators.pattern('[0-9]{3}')]),
				expMonth: new FormControl([''], [Validators.required]),
				expYear: new FormControl([''], [Validators.required])
			})
		});

		this.checkoutFormGroup.get("creditCard.cardType")?.setValue('Mastercard');

		cartService.totalQuantity.subscribe({
			next: (quantity: number) => this.totalQuantity = quantity
		});

		cartService.totalPrice.subscribe({
			next: (price: number) => this.totalPrice = price
		});
	}


	onSubmit(): void {
		console.log("Submit Action");

		if (this.billAddressSame) {
			this.checkoutFormGroup.controls['billingAddress']
				.setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
		}

		if (this.checkoutFormGroup.invalid) {
			this.firstName?.markAsDirty();
			this.lastName?.markAsDirty();
			this.email?.markAsDirty();
			this.cardNumber?.markAsDirty();
			this.cvv2Code?.markAsDirty();
			this.nameOnCard?.markAsDirty();
		}
	}

	copyShippingAddressToBillingAddress(event: Event): void {
		if ((event.currentTarget as HTMLInputElement).checked) {
			this.billAddressSame = true;
			this.checkoutFormGroup.controls['billingAddress']
				.setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
		} else {
			this.billAddressSame = false
			this.checkoutFormGroup.controls['billingAddress'].reset();
		}
	}

	handleMonthsAndYears(): void {
		const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

		const currentYear: number = new Date().getFullYear();
		const selectedYear: number = Number(creditCardFormGroup?.value.expYear);

		let startMonth: number = 1;

		if (currentYear === selectedYear) {
			startMonth = new Date().getMonth() + 1;
		}

		this.mayaFormService.getCreditCardExpirationMonths(startMonth).subscribe({
			next: (data: number[]) => this.creditCardExpirationMonths = data
		});
	}

	handleCountryChanges(shippingOrBillingAddress: string): void {

		const addressFormGroup =
			shippingOrBillingAddress === 'shipping' ?
				this.checkoutFormGroup.get('shippingAddress') :
				this.checkoutFormGroup.get('billingAddress');


		const selectedCountryCode = addressFormGroup?.value.country;

		this.countryService.getAllStatesByCountryCode(selectedCountryCode).subscribe({
			next: (page: DataPage<State>) => {
				shippingOrBillingAddress === 'shipping' ?
					this.shippingStates = page.content :
					this.billingStates = page.content;

				addressFormGroup?.get('state')?.setValue(page.content[0].id);
			}
		});


	}

	// Checkout :: Customer Form Getters
	protected get firstName(): AbstractControl<any, any> | null {
		return this.checkoutFormGroup.get('customer.firstName');
	}

	protected get lastName(): AbstractControl<any, any> | null {
		return this.checkoutFormGroup.get('customer.lastName');
	}

	protected get email(): AbstractControl<any, any> | null {
		return this.checkoutFormGroup.get('customer.email');
	}

	// Checkout :: Shipping Address Form Getters
	protected get shippingCountry(): AbstractControl<any, any> | null {
		return this.checkoutFormGroup.get('shippingAddress.country');
	}

	protected get shippingStreet(): AbstractControl<any, any> | null {
		return this.checkoutFormGroup.get('shippingAddress.street');
	}

	protected get shippingCity(): AbstractControl<any, any> | null {
		return this.checkoutFormGroup.get('shippingAddress.city');
	}

	protected get shippingState(): AbstractControl<any, any> | null {
		return this.checkoutFormGroup.get('shippingAddress.state');
	}

	protected get shippingZipCode(): AbstractControl<any, any> | null {
		return this.checkoutFormGroup.get('shippingAddress.zipCode');
	}

	// Checkout :: Billing Address Form Getters
	protected get billingCountry(): AbstractControl<any, any> | null {
		return this.checkoutFormGroup.get('billingAddress.country');
	}

	protected get billingStreet(): AbstractControl<any, any> | null {
		return this.checkoutFormGroup.get('billingAddress.street');
	}

	protected get billingCity(): AbstractControl<any, any> | null {
		return this.checkoutFormGroup.get('billingAddress.city');
	}

	protected get billingState(): AbstractControl<any, any> | null {
		return this.checkoutFormGroup.get('billingAddress.state');
	}

	protected get billingZipCode(): AbstractControl<any, any> | null {
		return this.checkoutFormGroup.get('billingAddress.zipCode');
	}

	// Checkout :: Card Form Getters
	protected get cardType(): AbstractControl<any, any> | null {
		return this.checkoutFormGroup.get('creditCard.cardType');
	}

	protected get nameOnCard(): AbstractControl<any, any> | null {
		return this.checkoutFormGroup.get('creditCard.nameOnCard');
	}

	protected get cardNumber(): AbstractControl<any, any> | null {
		return this.checkoutFormGroup.get('creditCard.cardNumber');
	}

	protected get cvv2Code(): AbstractControl<any, any> | null {
		return this.checkoutFormGroup.get('creditCard.cvv2Code');
	}

	protected get expMonth(): AbstractControl<any, any> | null {
		return this.checkoutFormGroup.get('creditCard.expMonth');
	}

	protected get expYear(): AbstractControl<any, any> | null {
		return this.checkoutFormGroup.get('creditCard.expYear');
	}

	// Checkout :: Address Equality
	protected get addressEquality(): AbstractControl<any, any> | null {
		return this.checkoutFormGroup.get('addressEquality.eqaul');
	}


}

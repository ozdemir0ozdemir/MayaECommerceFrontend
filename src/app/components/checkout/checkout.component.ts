import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MayaFormService} from '../../services/maya-form.service';
import {CountryService} from '../../services/country.service';
import {Country} from '../../common/country';
import {DataPage} from '../../common/data-page';
import {State} from '../../common/state';

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

	checkoutFormGroup: FormGroup;
	billAddressSame:boolean = false;

	totalPrice: number = 0;
	totalQuantity: number = 0;

	creditCardExpirationMonths: number[] = [];
	creditCardExpirationYears: number[] = [];

	countries: Country[] = [];
	shippingStates: State[] = [];
	billingStates: State[] = [];

	constructor(private formBuilder: FormBuilder,
				private mayaFormService: MayaFormService,
				private countryService: CountryService) {

		mayaFormService.getCreditCardExpirationYears().subscribe({
			next: (years: number[]) => this.creditCardExpirationYears = years
		});

		mayaFormService
			.getCreditCardExpirationMonths(new Date().getMonth() + 1).subscribe({
			next: (months : number[]) => this.creditCardExpirationMonths = months
		});

		countryService.getAllCountries().subscribe({
			next: (page: DataPage<Country>) => {
				this.countries = page.content;
				this.checkoutFormGroup.get('shippingAddress')?.get('country')?.setValue(page.content[0].code);
				this.checkoutFormGroup.get('billingAddress')?.get('country')?.setValue(page.content[0].code);
				this.handleCountryChanges('shipping');
				this.handleCountryChanges('billing');
			}

		});


		this.checkoutFormGroup = this.formBuilder.group({
			customer: this.formBuilder.group({
				firstName: [''],
				lastName: [''],
				email: ['']
			}),
			shippingAddress: this.formBuilder.group({
				country: [''],
				street: [''],
				city: [''],
				state: [''],
				zipCode: ['']
			}),
			addressEquality: this.formBuilder.group({
				equal: false
			}),
			billingAddress: this.formBuilder.group({
				country: [''],
				street: [''],
				city: [''],
				state: [''],
				zipCode: ['']
			}),
			creditCard: this.formBuilder.group({
				cardType: [''],
				nameOnCard: [''],
				cardNumber: [''],
				cvv2Code: [''],
				expMonth: [''],
				expYear: ['']
			})
		});
	}

	ngOnInit(): void {
	}

	onSubmit(): void {
		console.log("Submit Action");
		console.log(this.checkoutFormGroup?.get('customer')?.value);
		console.log(this.checkoutFormGroup?.get('shippingAddress')?.value);
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

		if(currentYear === selectedYear){
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
}

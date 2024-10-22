import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class MayaFormService {



	constructor() {
	}

	getCreditCardExpirationMonths(startMonth: number): Observable<number[]> {
		let data: number[] = [];

		for(let month: number = startMonth; month <= 12; month++)  {
			data.push(month);
		}

		return of(data);
	}

	getCreditCardExpirationYears(): Observable<number[]> {
		let data: number[] = [];

		const startYear: number = new Date().getFullYear();
		const endYear: number = startYear + 10;

		for(let year: number = startYear; year <= endYear; year++){
			data.push(year);
		}

		return of(data);
	}
}

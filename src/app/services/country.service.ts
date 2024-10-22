import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataPage} from '../common/data-page';
import {Country} from '../common/country';
import {State} from '../common/state';

@Injectable({providedIn: 'root'})
export class CountryService {

	private readonly baseUrl: string = "http://localhost:8080";
	private readonly countriesUrl: string = "countries";
	private readonly statesSuffix: string = "states";

	constructor(private httpClient: HttpClient) {


	}

	getAllCountries(page: number = 1, size: number = 100): Observable<DataPage<Country>> {
		return this.httpClient
			.get<DataPage<Country>>(`${this.baseUrl}/${this.countriesUrl}?page=${page}&size=${size}`)
			.pipe();
	}

	getAllStatesByCountryCode(countryCode: string, page: number = 1, size: number = 100): Observable<DataPage<State>> {
		return this.httpClient
			.get<DataPage<State>>(`${this.baseUrl}/${this.countriesUrl}/${countryCode}/${this.statesSuffix}?page=${page}&size=${size}`)
			.pipe();
	}


}

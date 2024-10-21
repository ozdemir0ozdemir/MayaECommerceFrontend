import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

	constructor(private router: Router) {
	}


	ngOnInit(): void {
	}

	searchByName(keyword: string): void {
		this.router.navigateByUrl(`/search/${keyword}`);
	}
}

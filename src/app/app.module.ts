import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule, routes} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ProductCategoryMenuComponent} from './components/product-category-menu/product-category-menu.component';
import {SearchComponent} from './components/search/search.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {NgbModule, NgbPagination} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	declarations: [
		AppComponent,
		ProductListComponent,
		ProductCategoryMenuComponent,
		SearchComponent,
		ProductDetailsComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		RouterModule.forRoot(routes),
		HttpClientModule,
		NgbModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}

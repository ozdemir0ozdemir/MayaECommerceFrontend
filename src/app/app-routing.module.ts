import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';

export const routes: Routes = [
	{path: 'search/:keyword', component: ProductListComponent},
	{path: 'category/:productCategoryId', component: ProductListComponent},
	{path: 'category', component: ProductListComponent},
	{path: 'products/:productId', component: ProductDetailsComponent},
	{path: 'products', component: ProductListComponent},
	{path: '', redirectTo: '/products', pathMatch: 'full'},
	{path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

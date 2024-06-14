import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { AdmUsersComponent } from './components/adm-users/adm-users.component';
import { AdmProductsComponent } from './components/adm-products/adm-products.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';



export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'cart', component: CartComponent },
    { path: 'adm-users', component: AdmUsersComponent },
    { path: 'adm-products', component: AdmProductsComponent },


    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

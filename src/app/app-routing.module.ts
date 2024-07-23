import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductsComponent } from './Components/products/products.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { VerifyResetCodeComponent } from './Components/verify-reset-code/verify-reset-code.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { authGuard } from './Guards/auth.guard';
import { noAuthGuard } from './Guards/no-auth.guard';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { ShippingAddressComponent } from './Components/shipping-address/shipping-address.component';
import { AllOrdersComponent } from './Components/all-orders/all-orders.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';
import { OrderDetailsComponent } from './Components/order-details/order-details.component';
import { CategoryProductsComponent } from './Components/category-products/category-products.component';
import { BrandProductsComponent } from './Components/brand-products/brand-products.component';

const routes: Routes = [
  {path:"" , redirectTo:"home",pathMatch:"full"},
  {path:"home" , canActivate:[authGuard] , component:HomeComponent},
  {path:"cart" , canActivate:[authGuard] ,component:CartComponent},
  {path:"wishList" , canActivate:[authGuard] ,component:WishListComponent},
  {path:"allorders" , canActivate:[authGuard] ,component:AllOrdersComponent},
  {path:"orderDetails" , canActivate:[authGuard] ,component:OrderDetailsComponent},
  {path:"products" , canActivate:[authGuard] ,component:ProductsComponent},
  {path:"categories" , canActivate:[authGuard] , component:CategoriesComponent},
  {path:"products/category/:categoryId" , canActivate:[authGuard] , component:CategoryProductsComponent},
  {path:"products/brand/:brandId" , canActivate:[authGuard] , component:BrandProductsComponent},
  {path:"brands" , canActivate:[authGuard] , component:BrandsComponent},
  {path:"shippingAddress/:cartId" , canActivate:[authGuard] , component:ShippingAddressComponent},
  {path:"product/:id" , canActivate:[authGuard] , component:ProductDetailsComponent},
  
  {path:"login" , canActivate:[noAuthGuard] , component:LoginComponent},
  {path:"forgetPassword" , canActivate:[noAuthGuard] , component:ForgetPasswordComponent},
  {path:"verifyResetCode" , canActivate:[noAuthGuard] , component:VerifyResetCodeComponent},
  {path:"resetPassword" , canActivate:[noAuthGuard] , component:ResetPasswordComponent},
  {path:"register" , canActivate:[noAuthGuard] , component:RegisterComponent},
  {path:"**" , component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

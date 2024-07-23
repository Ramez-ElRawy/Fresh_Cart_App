import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductsComponent } from './Components/products/products.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { RegisterTestComponent } from './Components/register-test/register-test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { VerifyResetCodeComponent } from './Components/verify-reset-code/verify-reset-code.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ProductComponent } from './Components/product/product.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeCategoriesSliderComponent } from './Components/home-categories-slider/home-categories-slider.component';
import { HomeMainSliderComponent } from './Components/home-main-slider/home-main-slider.component';
import { ShippingAddressComponent } from './Components/shipping-address/shipping-address.component';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { AllOrdersComponent } from './Components/all-orders/all-orders.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';
import { TitleSummerizePipe } from './Pipes/title-summerize.pipe';
import { SearchPipe } from './Pipes/search.pipe';
import { AddEGPPipe } from './Pipes/add-egp.pipe';
import { LoadingScreenComponent } from './Components/loading-screen/loading-screen.component';
import { SocialMediaComponent } from './Components/social-media/social-media.component';
import { OrderDetailsComponent } from './Components/order-details/order-details.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { CategoryProductsComponent } from './Components/category-products/category-products.component';
import { BrandProductsComponent } from './Components/brand-products/brand-products.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    NavbarComponent,
    CategoriesComponent,
    BrandsComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    NotfoundComponent,
    RegisterTestComponent,
    ForgetPasswordComponent,
    VerifyResetCodeComponent,
    ResetPasswordComponent,
    ProductComponent,
    ProductDetailsComponent,
    HomeCategoriesSliderComponent,
    HomeMainSliderComponent,
    ShippingAddressComponent,
    AllOrdersComponent,
    WishListComponent,
    TitleSummerizePipe,
    SearchPipe,
    AddEGPPipe,
    LoadingScreenComponent,
    SocialMediaComponent,
    OrderDetailsComponent,
    CategoryProductsComponent,
    BrandProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    JwtModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

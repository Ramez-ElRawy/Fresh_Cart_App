import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // loadingScreen = new BehaviorSubject<boolean>(false);
  constructor(private _HttpClient:HttpClient) { }

  getAllProducts(limit:number,pageNumber:number):Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?limit=${limit}&page=${pageNumber}`);
  }

  getProductById(id:string):Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  getAllCategories():Observable<any>
  {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  getSpecificCategory(categoryId:string):Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`)
  }

  getAllSubcategoriesOnCategory(categoryId:string):Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`)
  }

  getAllBrands():Observable<any>
  {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

  getSpecificBrand(brandId:string):Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
  }

  getCategoryProducts(categoryId:string|null):Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`)
  }

  getBrandProducts(brandId:string|null):Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`)
  }
  
}

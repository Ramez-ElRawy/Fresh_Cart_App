import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../Interfaces/iproduct';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(productsList:IProduct[] , searchTerm:string): IProduct[] {
    return productsList.filter((product)=>product.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }

}

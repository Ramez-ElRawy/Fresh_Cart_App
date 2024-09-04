import { Component, Input } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() totalPagesNumber!:number;
  @Input() currentPageNumber!:number;
  constructor(private _productService:ProductService) {}

  previousPage(){
    console.log('previousPage');
    if (this.currentPageNumber > 1) {
      console.log('valid');
      this.currentPageNumber--;
      this._productService.getAllProducts(20,this.currentPageNumber)
    }
    else{
      console.log('invalid');
    }
  }

  nextPage(){
    console.log('nextPage');
    if (this.currentPageNumber < this.totalPagesNumber) {
      console.log('valid');
      this.currentPageNumber++;
      this._productService.getAllProducts(20,+this.currentPageNumber)
    }
    else{
      console.log('invalid');
    }
  }
}

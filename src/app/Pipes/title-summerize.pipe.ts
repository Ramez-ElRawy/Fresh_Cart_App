import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleSummerize'
})
export class TitleSummerizePipe implements PipeTransform {

  transform(title:string , numOfWords:number): string {
    return title.split(' ').slice(0,numOfWords).join(' ');
  }

}

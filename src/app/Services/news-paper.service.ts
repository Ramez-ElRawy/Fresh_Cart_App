import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// not related to project

@Injectable({
  providedIn: 'root'
})
export class NewsPaperService {

  constructor() { }

  newsPaperIssues:string[] = [
    "Issue1: Breaking News!",
    "Issue2: Sports Highlights",
    "printing error",
    "Issue3: Weather Report",
    "Issue4: Local News"
  ]

  getNewsPaper()
  {
    

    return new Observable((observer)=>{
      let currentNewsIssueIndex = 0;
      let id = setInterval(()=>{
        if(this.newsPaperIssues[currentNewsIssueIndex] == "printing error"){
          observer.error("error in printing occured")
        }
        if(currentNewsIssueIndex<this.newsPaperIssues.length){
          observer.next(this.newsPaperIssues[currentNewsIssueIndex])
          currentNewsIssueIndex++;
        }
        else{
          observer.complete();
        }
        console.log("set interval cycle");
        
      },3000)

      return{
        unsubscribe() {
            console.log("unsubscribe");
            clearInterval(id);
        },
      }
    })
  }
}

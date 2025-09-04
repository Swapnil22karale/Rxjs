import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loadingState$ : Subject<boolean> = new Subject()

  loadingStateObj$ : Observable<boolean> = this.loadingState$.asObservable()

  constructor() {}
  
     loadingStateEmiter(flag : boolean){
      this.loadingState$.next(flag)
    }
}

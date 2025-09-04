import { Injectable } from '@angular/core';
import { filter, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfService {

  ofNums$ : Observable<number> = of(1,2,3,4,5,6,7,8,9,10)

  ofEvenNum$ : Observable<number> = this.ofNums$
                                    .pipe(
                                      filter((num) =>{
                                        return num % 2 === 0
                                      })
                                    )

  constructor() { }
}

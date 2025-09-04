import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserNameService {

  userName$ : Subject<string> = new Subject<string>()

  constructor() { }
}

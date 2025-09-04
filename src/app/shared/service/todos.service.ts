import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroment/enviroment';
import { Itodos } from '../models/todos';
import { map, Observable ,filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  TODOS_URL = `${enviroment.jsonPlaceholderURL}/todos`

  constructor(
    private _http : HttpClient
  ) { }

  fetchAllTodos():Observable<Itodos>{
    return this._http.get<Itodos>(this.TODOS_URL)
  } 
  fetchCompletedTodos() : Observable<Itodos>{
    return this._http.get<Itodos>(this.TODOS_URL)
                    .pipe(
                      map(arr =>{
                        console.log(arr)
                        return arr.filter((todo:Itodos) => todo.completed)
                      })
                    )
  }
}

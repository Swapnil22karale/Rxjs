import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroment/enviroment';
import { InewTodo } from '../models/new-todo';
import { map, Observable, Subject } from 'rxjs';
import { Itodos } from '../models/todos';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class NewTodoService {

  BASE_URL : string = `${enviroment.TODOS_BASE_URL}`;
  TODO_URL : string = `${enviroment.TODOS_BASE_URL}/todos.json`

 private newTodoSub$ : Subject<InewTodo> = new Subject<InewTodo>()
 private editSubTodo$ : Subject<InewTodo> = new Subject<InewTodo>()
 private updatetodoSub$ : Subject<InewTodo> = new Subject<InewTodo>()

  newTodoObservable$ : Observable<InewTodo> = this.newTodoSub$.asObservable()
  editTodoObservable$ : Observable<InewTodo> = this.editSubTodo$.asObservable()
  updateTodoObservable$ : Observable<InewTodo> = this.updatetodoSub$.asObservable()
 

  constructor(
    private _http : HttpClient,
    private _loaderService : LoaderService
  ) { }

   editTodoEmitter(todo : InewTodo){
    this.editSubTodo$.next(todo)   /// as a Observer
  }

  newTodoEmmiter(todo : InewTodo){
    this.newTodoSub$.next(todo)
  }

  updateTodoEmitter(todo : InewTodo){
    this.updatetodoSub$.next(todo)  /// as a observer
  }

  

  createTodo(todo : InewTodo):Observable<{name : string}>{
    return this._http.post<any>(this.TODO_URL, todo)    
  }

  fetchAllTodos():Observable<Array<InewTodo>>{
    this._loaderService.loadingStateEmiter(true)
    return this._http.get<Array<InewTodo>>(this.TODO_URL)
      .pipe(
        map( data =>{
          let todosArr : Array<InewTodo> = []
          for(const key in data){
            todosArr.push({...data[key] , todoId : key})
          }
          return todosArr
        })
      )
  }

  updateTodo(updateTodo : InewTodo) : Observable<InewTodo>{
    let UPDATED_URL = `${this.BASE_URL}/todos/${updateTodo.todoId}.json`

    return this._http.patch<InewTodo>(UPDATED_URL, updateTodo)
  }

  removeTodo(id : string) : Observable<any>{
    let REMOVE_URL = `${this.BASE_URL}/todos/${id}.json`
    return this._http.delete(REMOVE_URL)
  }
}

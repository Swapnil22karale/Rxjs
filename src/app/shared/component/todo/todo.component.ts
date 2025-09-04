import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../service/todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor(
    private _todoService : TodosService
  ){}

  ngOnInit(): void {
    // this._todoService.fetchAllTodos()
    //   .subscribe( todo =>{
    //     console.log(todo);
         
    //   })
    this._todoService.fetchCompletedTodos()
      .subscribe( todo =>{
        console.log(todo);
        
      })
  }
}

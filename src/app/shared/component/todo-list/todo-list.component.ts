import { Component, OnInit } from '@angular/core';
import { InewTodo } from '../../models/new-todo';
import { NewTodoService } from '../../service/new-todo.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoArr !: Array<InewTodo>
  constructor(
    private _todoService : NewTodoService,
    private _matDialog : MatDialog ,
    private _loader : LoaderService
  ){}

  ngOnInit(): void {
    this.getAllTodos()

    this._todoService.newTodoObservable$
      .subscribe( res =>{
        this.todoArr.push(res)
      })

      this._todoService.updateTodoObservable$
        .subscribe( updatedObj =>{
          let getIndex  = this.todoArr.findIndex(todo => todo.todoId === updatedObj.todoId)

          this.todoArr[getIndex] = updatedObj
        })

  }

  getAllTodos(){
     this._todoService.fetchAllTodos()
      .subscribe({
        next : data =>{
          console.log(data);
          this.todoArr = data
          this._loader.loadingStateEmiter(false)
        },
        error : err =>{
          console.log(err);
          this._loader.loadingStateEmiter(false)
        }
      })
  }

  onEdit(todo : InewTodo){
    this._todoService.editTodoEmitter(todo)
  }

  onRemove(todo : InewTodo){
    // let getConfirm = confirm(`Are you sure want to Remove todo Item ? `)

    // if(getConfirm){
    //   this._todoService.removeTodo(todo.todoId).subscribe({

    //     next : data =>{
    //       console.log(data);
    //       let getIndex = this.todoArr.findIndex(t => t.todoId === todo.todoId)
    //       this.todoArr.splice(getIndex , 1)
    //     },
    //     error : err =>{
    //       console.log(err);
          
    //     }
    //   })
    // }
    let matConfig = new MatDialogConfig

    matConfig.data = `Are you sure want to remove the ${todo.todoItem} todo !!`
    matConfig.width = '500px'
    matConfig.disableClose = true

    let matDialogRef = this._matDialog.open(GetConfirmComponent, matConfig)

    matDialogRef.afterClosed().subscribe(flag =>{
      if(flag){
        console.log(todo);
        this._todoService.removeTodo(todo.todoId).subscribe({
          next : res =>{
            console.log(res);
            let getIndex = this.todoArr.findIndex(t => t.todoId === todo.todoId)
            this.todoArr.slice(getIndex, 1)
          },
          error : err =>{
            console.log(err);
          }
        })
      }
    })
  }
}

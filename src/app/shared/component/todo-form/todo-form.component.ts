import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewTodoService } from '../../service/new-todo.service';
import { InewTodo } from '../../models/new-todo';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit{

  todoForm ! : FormGroup
  isInEditMode : boolean = false
  editTodo ! : InewTodo

  constructor(
    private _todoService : NewTodoService , 
    private _snackBar : SnackbarService
  ){}

  ngOnInit(): void {
    this.createTodoForm();

    this._todoService.editTodoObservable$
      .subscribe(todo =>{
        console.log(todo);
        if(todo){
          this.isInEditMode = true
          this.editTodo = todo
          this.todoForm.patchValue(todo)
        }
        
      })
  }

  createTodoForm(){
    this.todoForm = new FormGroup({
      todoItem : new FormControl(null,[Validators.required])
    })
  }

  onAddTodo(){
    if(this.todoForm.valid){
      let todoObj = this.todoForm.value;
      console.log(todoObj);
      this.todoForm.reset()

      ///API CAll

      this._todoService.createTodo(todoObj)
        .subscribe({
          next : data =>{
            console.log(data);

            ///send this new todo to todoList component

            let newTodoObj :  InewTodo = {
              ...todoObj,
              todoId : data.name
            }
            console.log(newTodoObj);
            this._snackBar.openSnackBar(`The new todo item ${newTodoObj.todoItem} is Created Successfully`)
             this._todoService.newTodoEmmiter(newTodoObj)
          },
          error : err =>{
            console.log(err);
            this._snackBar.openSnackBar(`Something went wrong while creating new Todo`)
          }
        })
    }
  }

  onTodoUpdate(){
    if(this.todoForm.valid){
      let updateObj : InewTodo = {...this.todoForm.value, todoId : this.editTodo.todoId}
      console.log(updateObj);
      this._todoService.updateTodo(updateObj)
        .subscribe({
          next : data =>{
            console.log(data);
            this.isInEditMode = true;
            this.todoForm.reset()
            /// send updated object to todolist
            this._snackBar.openSnackBar(`The todo item ${updateObj.todoItem} is updated Successfully !!!`)
            this._todoService.updateTodoEmitter(updateObj)
          },
          error : err =>{
            console.log(err);
            this._snackBar.openSnackBar(`Something went wronf while updating Todo !!`)
          }
        })
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Istudent } from '../../models/student';
import { StudentService } from '../../service/student.service';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-std-form',
  templateUrl: './std-form.component.html',
  styleUrls: ['./std-form.component.scss']
})
export class StdFormComponent implements OnInit{

  stdForm !: FormGroup 
  editStd ! : Istudent
  isInEditMode : boolean = false

  constructor(
    private _stdService : StudentService,
    private _snackBar : SnackbarService
  ){}

  ngOnInit(): void {
    this. createStdForm()

    this._stdService.editStdObs$
      .subscribe(data =>{
        this.isInEditMode = true
        this.editStd = data
        this.stdForm.patchValue(data)
      })

  }

  createStdForm(){
    this.stdForm = new FormGroup({
      fName : new FormControl(null,[Validators.required]),
      lName : new FormControl(null,[Validators.required]),
      email : new FormControl(null,[Validators.required]),
      contact : new FormControl(null,[Validators.required])
    })
  }

  onAddStd(){
    if(this.stdForm.valid){
      let stdObj : Istudent = this.stdForm.value
      console.log(stdObj);
      this.stdForm.reset()
      this._stdService.createStd(stdObj)
        .subscribe({
          next : res =>{
            console.log(res);
            this._stdService.emitNewStd({...stdObj ,stdId : res.name })
            this._snackBar.openSnackBar(`The New Student Created Successfully !!`)
          },
          error : err =>{
            this._snackBar.openSnackBar(`Something wrong to Create new Student`)            
          }
        })
      
    }
  }

  onUpdate(){
    if(this.stdForm.valid){
      let UPDATED_OBJ :Istudent = {...this.stdForm.value , stdId : this.editStd.stdId} 
      console.log(UPDATED_OBJ);

      this._stdService.updateStd(UPDATED_OBJ)
        .subscribe({
          next : res =>{
            console.log(res);
            this._snackBar.openSnackBar(`The Student ${UPDATED_OBJ.fName} is Updated Successfully !! `)
            this.stdForm.reset();
            this.isInEditMode = false
            this._stdService.emitUpdateStd(res)
          },
          error : err =>{
            this._snackBar.openSnackBar(`Something went wrong to Update Student`)
          }
        })
    }
  }


}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { StudentService } from '../../service/student.service';
import { SnackbarService } from '../../service/snackbar.service';
import { Istudent } from '../../models/student';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-std-table',
  templateUrl: './std-table.component.html',
  styleUrls: ['./std-table.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush

})
export class StdTableComponent implements OnInit , OnDestroy{

  private destroy$ = new Subject<void>()
  subscriptions ! : Subscription
  stdArr : Array<Istudent> = []

  studentArrObs$ !: Observable<Istudent[]>

  constructor(
    private _stdService : StudentService,
    private _snackBar :SnackbarService,
    private _matdialog : MatDialog,
    private cdr : ChangeDetectorRef
  ){}

  ngOnInit(): void {
    // this.getAllStudents()
    this.studentArrObs$ = this._stdService.fetchAllStident()
    this.addNewStd()
    this.updateStd()
  }

  addNewStd(){
      this._stdService.newStdObs$
      .subscribe(res =>{
      this.stdArr.push(res)    
      this.cdr.detectChanges()    
      })
  }

  updateStd(){
       this._stdService.updateStdObs$
        .subscribe(updatedObj =>{
          let getIndex = this.stdArr.findIndex(std => std.stdId === updatedObj.stdId)
          this.stdArr[getIndex] = updatedObj
        })
  }

  getAllStudents(){
    this._stdService.fetchAllStident()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next : data =>{
          console.log(data);
          this.stdArr = data
          this.cdr.markForCheck()
        },
        error : err =>{
          console.log(err);
          this.cdr.markForCheck()
        }
      }) 
  }

  onEdit(std : Istudent){
    console.log(std);
    this._stdService.emitEditStd(std)
    
  }

  onRemove(std : Istudent){
    let matConfig = new MatDialogConfig
    matConfig.data = `Are you sure you want to delete it`

    let matRef =  this._matdialog.open(GetConfirmComponent, matConfig)

    matRef.afterClosed()
      .subscribe(flag =>{
        if(flag){
          this._stdService.removeStd(std.stdId)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next : res =>{
                console.log(res);
                let getIndex = this.stdArr.findIndex(stdObj => stdObj.stdId === std.stdId)
                this.stdArr.splice(getIndex , 1) 
                this._snackBar.openSnackBar(`The Student ${std.fName} is remove Successfully !!`)
              },
              error : err =>{
                console.log(err);
                
              }
            })
        }
      })
  }

  ngOnDestroy():void{
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }

}

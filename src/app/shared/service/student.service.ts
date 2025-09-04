import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroment/enviroment';
import { IstdRes, Istudent } from '../models/student';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  BASE_URL : string = `${enviroment.STUDENT_BASE_URL}`;
  STUDENT_URL : string = `${this.BASE_URL}/students.json`

  private newStdSub$ : Subject<Istudent> = new Subject()
  private editStdSub$ : Subject<Istudent> = new Subject()
  private updateStdSub$ : Subject<Istudent> = new Subject()

  newStdObs$ : Observable<Istudent> = this.newStdSub$.asObservable()
  editStdObs$ : Observable<Istudent> = this.editStdSub$.asObservable()
  updateStdObs$ : Observable<Istudent> = this.updateStdSub$.asObservable()

  constructor(
    private _http : HttpClient
  ) { }
  
  emitUpdateStd(std :Istudent){
    this.updateStdSub$.next(std)
  }

  emitEditStd(std:Istudent){
    this.editStdSub$.next(std)
  }

  emitNewStd(std : Istudent){
    this.newStdSub$.next(std)
  }

  createStd(stdObj : Istudent) : Observable<{name : string}>{
    return this._http.post<any>(this.STUDENT_URL , stdObj)
  }

  fetchAllStident():Observable<Istudent[]>{
    return this._http.get<IstdRes>(this.STUDENT_URL)
                    .pipe(
                      map(res =>{
                        let arr : Array<Istudent> = []
                        for(const key in res){
                          arr.push({...res[key], stdId : key})
                        }
                        return arr
                      })
                    )
  }

  updateStd(stdObj : Istudent):Observable<Istudent>{
    let UPDATE_URL = `${this.BASE_URL}/students/${stdObj.stdId}.json`

    return this._http.patch<Istudent>(UPDATE_URL , stdObj)
  }

  removeStd(id:string):Observable<any>{
    let REMOVE_URL = `${this.BASE_URL}/students/${id}.json`
    return this._http.delete(REMOVE_URL)
  }

}

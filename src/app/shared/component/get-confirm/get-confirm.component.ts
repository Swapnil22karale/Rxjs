import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-get-confirm',
  templateUrl: './get-confirm.component.html',
  styleUrls: ['./get-confirm.component.scss']
})
export class GetConfirmComponent {

  msg ! : string
  constructor(
    @Inject(MAT_DIALOG_DATA) data : string,
    private _matRef : MatDialogRef<GetConfirmComponent>
  ){
    this.msg = data
  }

  onClose(flag : boolean){
    this._matRef.close(flag)
  }
  
}

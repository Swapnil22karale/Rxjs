import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const matArr = [
  MatDialogModule,
  MatSnackBarModule,
  MatProgressSpinnerModule
]

@NgModule({
  declarations: [],
  imports: [...matArr,
    CommonModule
  ],
  exports:[...matArr]
})
export class MaterialModule { }

import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit{

  isLoading : boolean = false

  constructor(
    private _loader : LoaderService
  ){}

  ngOnInit(): void {
    this._loader.loadingStateObj$.subscribe(res =>{
      this.isLoading = res
    })
  }
}

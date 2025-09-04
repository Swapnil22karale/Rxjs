import { Component, OnInit } from '@angular/core';
import { OfService } from '../../service/of.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _ofService : OfService
  ){}

  ngOnInit(): void {
    this._ofService.ofEvenNum$.subscribe(num =>{
      console.log(num);
      
    })
  }


}
